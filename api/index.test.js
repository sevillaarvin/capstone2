const request = require("supertest")
const expect = require("chai").expect
const app = require("./index").app
const {
  generateUserToken,
  verifyUserToken,
  hashPassword,
} = require("./auth")
const db = require("../db/knex")

const tokenUser = generateUserToken({
  userId: 2,
  roleId: 2,
  username: "user",
})

before(function(done) {
  this.timeout(20000)
  db.migrate.rollback().then(() => {
    return db.migrate.latest()
  }).then(() => {
    return db.seed.run()
  }).then(() => {
    done()
  }).catch(e => {
    console.error(e.message)
    console.error(e.detail)
    done(e)
  })
})

describe("GET /member/id", () => {
  it("should return the member with id 2", done => {
    request(app)
      .get("/member/2")
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.all.keys(
          "firstName",
          "lastName",
          "username",
          "avatar",
        )
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /profile/id", () => {
  const token3 = generateUserToken({
    userId: 3,
    roleId: 2,
    username: "anotheruser",
  })

  it("should return the details of member with id 2 when authorized", done => {
    request(app)
      .get("/profile/2")
      .set("authorization", "Bearer " + tokenUser)
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.all.keys(
          "id",
          "firstName",
          "lastName",
          "gender",
          "email",
          "username",
          "birthdate",
          "address",
        )
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return the details of member with id 2 when not authorized", done => {
    request(app)
      .get("/profile/2")
      .set("authorization", "Bearer " + token3)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return the details of member with id 3 when not authenticated", done => {
    request(app)
      .get("/profile/3")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("PATCH /profile", () => {
  const token3 = generateUserToken({
    userId: 3,
    roleId: 2,
    username: "anotheruser",
  })

  const newBirth = new Date(2010, 0, 1)

  it("should change user details with id 3", done => {
    request(app)
      .patch("/profile/3")
      .set("authorization", "Bearer " + token3)
      .send({
        firstName: "FirstNameChanged",
        lastName: "LastNameChanged",
        gender: "Female",
        username: "usernamechanged",
        email: "email@changed",
        birthdate: newBirth.toLocaleString(),
        address: "Address has changed",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select([
            "firstName",
            "lastName",
            "gender",
            "username",
            "email",
            "birthdate",
            "address",
          ])
          .from("member")
          .where({ id: 3 })
          .first()
          .then(member => {
            expect(member).to.be.an("object")
              .to.have.all.keys(
                "firstName",
                "lastName",
                "gender",
                "username",
                "email",
                "birthdate",
                "address",
              )
            expect(member.firstName)
              .to.equal("FirstNameChanged")
            expect(member.lastName)
              .to.equal("LastNameChanged")
            expect(member.gender)
              .to.equal("f")
            expect(member.username)
              .to.equal("usernamechanged")
            expect(member.email)
              .to.equal("email@changed")
            expect(new Date(member.birthdate).toISOString())
              .to.equal(newBirth.toISOString())
            expect(member.address)
              .to.equal("Address has changed")
            done()
          }).catch(e => {
            done(e)
          })
      })
  })

  it("should not update member detail of unauthorzied member", done => {
    request(app)
      .patch("/profile/3")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        lastName: "Hmmm"
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update member with wrong fields", done => {
    request(app)
      .patch("/profile/3")
      .set("authorization", "Bearer " + token3)
      .send({
        what: "Hmmm"
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("POST /signup", () => {
  it("should register the user", done => {
    request(app)
      .post("/signup")
      .send({
        firstName: "Tiffany",
        lastName: "Tester",
        email: "tif@test.com",
        username: "test",
        password: "test",
        birthdate: "1990-01-01",
        address: "Somewhere in America",
        role_id: 1,
      })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.all.keys("userId", "username", "role_id", "token")
        expect(res.body.userId)
          .to.be.a("number")
        expect(res.body.username)
          .to.be.a("string")
        expect(res.body.token)
          .to.be.a("string")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should hash the user's password", done => {
    request(app)
      .post("/signup")
      .send({
        firstName: "Gerald",
        lastName: "Gregor",
        email: "ger@mane.com",
        username: "geraldgreg",
        password: "shouldbehashed",
        birthdate: "2000-08-08",
        address: "18 Open Street, Ohio",
        role_id: 1
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select("password")
          .from("member")
          .where({id: res.body.userId})
          .first()
          .then(res => {
            expect(res).to.be.an("object")
            expect(res.password).to.not.be.equal("shouldbehashed")
            done()
        }).catch(e => done(e))
      })
  })

  it("should not register an existing username", done => {
    request(app)
      .post("/signup")
      .send({
        firstName: "Gerald",
        lastName: "Gregor",
        email: "ger@mane.com",
        username: "geraldgreg",
        password: "shouldbehashed",
        birthdate: "2000-08-08",
        address: "18 Open Street, Ohio",
        role_id: 1
      })
      // TODO: Should expect 403 Forbidden
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not register when required fields are missing", done => {
    request(app)
      .post("/signup")
      .send({
        these: "fields",
        are: "invalid",
        password: "asdf"
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("POST /signin", () => {
  it("should sign in the user", done => {
    request(app)
      .post("/signin")
      .send({
        username: "test",
        password: "test",
      })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.all.keys("userId", "roleId", "username", "token")
        expect(res.body.userId)
          .to.be.a("number")
        expect(res.body.roleId)
          .to.be.a("number")
        expect(res.body.username)
          .to.be.a("string")
        expect(res.body.token)
          .to.be.a("string")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not sign in invalid user", done => {
    request(app)
      .post("/signin")
      .send({
        username: "asdfasdf",
        password: "i am invalid",
      })
      .expect(404)
      .expect(res => {
        expect(res.text).to.be.a("string")
          .to.be.equal("Invalid username or password")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not signin if required fields are missing", done => {
    request(app)
      .post("/signin")
      .send({
        what: "the"
      })
      .expect(400)
      .expect(res => {
        expect(res.text).to.be.a("string")
          .to.be.equal("A valid username and password is required")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not sign in a deactivated member", async function() {
    const password = await hashPassword("deactivated")
    await db.insert({
        firstName: "Deactivate",
        lastName: "Me",
        email: "deactivated@test.com",
        username: "deactivateduser",
        password,
        role_id: 1,
        deactivated: true,
      })
      .into("member")

    await request(app)
      .post("/signin")
      .send({
        username: "deactivateduser",
        password: "deactivated",
      })
      .expect(401)
      .expect(res => {
        expect(res.text).to.be.a("string")
          .to.be.equal("User has been deactivated")
      })
  })
})

describe("GET /category", () => {
  it("should return all categories", done => {
    request(app)
      .get("/category")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
        expect(res.body).to.have.lengthOf.at.least(1)
        expect(res.body[0]).to.have.all.keys("id", "name")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /category/name", () => {
  it("should return the category with matching name", done => {
    request(app)
      .get("/category/Swimming Equipment")
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.be.an("array")
        expect(res.body[0]).to.include.all.keys(
          "id",
          "sku",
          "name",
          "category",
          "description",
          "price",
          "rating",
        )
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 404 with an invalid category id", done => {
    request(app)
      .get("/category/888888888")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return the category with matching name limited to 5 items", done => {
    request(app)
      .get("/category/Swimming Equipment")
      .query({ limit: 5 })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array").with.lengthOf(5)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return the category with matching name skipping 10 items", done => {
    request(app)
      .get("/category/Swimming Equipment")
      .query({ offset: 10 })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
      })
      .end((err, res) => {
        if (err) return done(err)
        db.select(["item.id", "category.name as category"])
          .from("item")
          .where({ "category.name": "Swimming Equipment" })
          .innerJoin("category", "item.category_id", "category.id")
          .then(dbres => {
            expect(dbres).to.be.an("array")
            expect(dbres[10].id).to.equal(res.body[0].id)
            done()
        }).catch(e => done(e))
      })
  })
})

describe("GET /size", () => {
  it("should return all size", done => {
    request(app)
      .get("/size")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
        expect(res.body).to.have.lengthOf.at.least(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /size/id", () => {
  it("should return the size with id 1", done => {
    request(app)
      .get("/size/1")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.a.property("id")
        expect(res.body.id).to.be.equal(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 404 with an invalid size id", done => {
    request(app)
      .get("/size/asdfsdf")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /item", () => {
  it("should return all items", done => {
    request(app)
      .get("/item")
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.keys([
          "total",
          "items",
        ])
        expect(res.body.total).to.be.a("number")
          .above(0)
          .that.satisfy(Number.isInteger)
        expect(res.body)
          .to.have.nested.property("items[0]")
          .with.keys([
            "id",
            "sku",
            "name",
            "category",
            "description",
            "img",
            "price",
            "discount",
            "size",
            "rating",
          ])
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return featured items", done => {
    request(app)
      .get("/item")
      .query({"featured": ""})
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.keys([
          "total",
          "items",
        ])
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return limited items", done => {
    request(app)
      .get("/item")
      .query({"limit": "10"})
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.property("items").with.lengthOf(10)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return skipped items", done => {
    request(app)
      .get("/item")
      .query({"offset": "10"})
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.property("items")
        expect(res.body.items[0]).to.be.an("object")
          .with.property("id")
          .to.equal(11)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 5 items, skipping 10 items", (done) => {
    request(app)
      .get("/item")
      .query({
        "offset": "10",
        limit: 5,
      })
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.property("items")
          .with.lengthOf(5)
        expect(res.body.items[0]).to.be.an("object")
          .with.property("id")
          .to.equal(11)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 10 items sorted by category", function(done) {
    request(app)
      .get("/item")
      .query({
        limit: 10,
        orderBy: "category",
      })
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.property("items")
          .with.lengthOf(10)
        const isSorted = res.body.items
          .map((item) => item.category)
          .reduce((sorted, category, index, categories) => {
            if (index === 0) {
              return true
            }

            if (sorted === false) {
              return sorted
            }

            return categories[index-1] <= category
          }, true)
        expect(isSorted).to.be.true
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 10 items sorted by id descending", function(done) {
    request(app)
      .get("/item")
      .query({
        limit: 10,
        orderBy: "id",
        descending: true,
      })
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.property("items")
          .with.lengthOf(10)
        const isSortedDescending = res.body.items
          .map((item) => item.id)
          .reduce((sorted, id, index, ids) => {
            if (index === 0) {
              return true
            }

            if (sorted === false) {
              return sorted
            }

            return ids[index-1] >= id
          }, true)
        expect(isSortedDescending).to.be.true
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should search for items with name/description mesh", async function() {
    await request(app)
      .get("/item")
      .query({
        search: "mesh"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property("items")
          // Value is dependent on current random dataset
          .to.have.lengthOf(16)
      })
  })
})

describe("GET /item/id", () => {
  it("should return the item with sku VXYIWV3367", done => {
    request(app)
      .get("/item/VXYIWV3367")
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.a.property("id")
        expect(res.body.id).to.be.equal(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 404 with an invalid item id", done => {
    request(app)
      .get("/item/asdfasdf")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /order/id", () => {
  it("should return the orders of member with id 2", done => {
    request(app)
      .get("/order/2")
      .set("authorization", "Bearer " + tokenUser)
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.be.an("array")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return order items of different user", done => {
    request(app)
      .get("/order/3")
      .set("authorization", "Bearer " + tokenUser)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /order_detail/id", () => {
  it("should return the order_detail with id 1", done => {
    request(app)
      .get("/order_detail/1")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.a.property("id")
        expect(res.body.id).to.be.equal(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 404 with an invalid order_detail id", done => {
    request(app)
      .get("/order_detail/12333")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

})

describe("GET /order_detail", () => {
  it("should return all order_detail with orderId 1", done => {
    request(app)
      .get("/order_detail")
      .query({"orderId": "1"})
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
