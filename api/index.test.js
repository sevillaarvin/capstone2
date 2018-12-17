const request = require("supertest")
const expect = require("chai").expect
const app = require("./index").app
const { generateUserToken, verifyUserToken } = require("./auth")
const db = require("../db/knex")
// token used for testing authentication
const tokenAdmin = generateUserToken({
  userId: 1,
  roleId: 1,
  username: "admin",
})
const tokenUser = generateUserToken({
  userId: 2,
  roleId: 2,
  username: "user",
})

before(function(done) {
  this.timeout(10000)
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

describe("GET /role", () => {
  it("should return all role names", done => {
    request(app)
      .get("/role")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.be.an("array").to.have.lengthOf(2)
        expect(res.body[0]).to.have.all.keys("id", "name")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return members if not authenticated", done => {
    request(app)
      .get("/role")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return members if only authorized as user", done => {
    request(app)
      .get("/role")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /member", () => {
  it("should return all members", done => {
    request(app)
      .get("/member")
      .set("authorization", "Bearer " + tokenAdmin)
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

  it("should not return members if not authenticated", done => {
    request(app)
      .get("/member")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return members if only authorized as user", done => {
    request(app)
      .get("/member")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("POST /member", () => {
  it("should create a new member", done => {
    request(app)
      .post("/member")
      .send({
        firstName: "Post",
        lastName: "Member",
        username: "postmemberrandom",
        email: "random@random.com",
        role_id: 1,
      })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
        expect(res.body[0]).to.be.a("number")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("PATCH /member", () => {
  it("should update details of user with id 3", done => {
    request(app)
      .patch("/member")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        id: 3,
        username: "changed",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select("username")
          .from("member")
          .where({ id: 3 })
          .first()
          .then(res => {
            expect(res).to.be.an("object")
            expect(res.username).to.be.equal("changed")
            done()
        }).catch(e => done(e))
      })
  })

  it("should return 404 for nonexistent member", done => {
    request(app)
      .patch("/member")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        id: 999999,
        username: "whatever",
      })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  }) 

  it("should return 400 for wrong fields to be updated", done => {
    request(app)
      .patch("/member")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        id: 3,
        wrong: "field",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
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

describe("GET /member/detail/id", () => {
  it("should return the details of member with id 2 when authorized", done => {
    request(app)
      .get("/member/detail/2")
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
      .get("/member/detail/2")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not return the details of member with id 3 when not authenticated", done => {
    request(app)
      .get("/member/detail/3")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("PATCH /member/detail", () => {
  const token3 = generateUserToken({
    userId: 3,
    roleId: 2,
    username: "anotheruser",
  })

  const newBirth = new Date(2010, 0, 1)

  it("should change user details with id 3", done => {
    request(app)
      .patch("/member/detail")
      .set("authorization", "Bearer " + token3)
      .send({
        id: 3,
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
      .patch("/member/detail")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        id: 3,
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
      .patch("/member/detail")
      .set("authorization", "Bearer " + token3)
      .send({
        id: 3,
        what: "Hmmm"
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

// TODO: Complete delete member API
describe("DELETE /member/id", () => {
  /*
  it("should delete the member with id 2", done => {
    request(app)
      .delete("/member/2")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
  */
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
          .to.be.equal("Invalid username or password.")
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
          .to.be.equal("A valid username and password is required.")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
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
        expect(res.body).to.be.an("array")
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
        expect(res.body).to.be.an("array").with.lengthOf(10)
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
        expect(res.body).to.be.an("array")
        expect(res.body[0]).to.be.an("object")
          .with.property("id")
          .to.equal(11)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
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

describe("POST /cart", () => {
  it("should add item to cart", done => {
    request(app)
      .post("/cart")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        cartId: 2,
        itemId: 2,
        quantity: 3,
      })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array").with.lengthOf(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should add to item quantity of cart if it already exists", done => {
    request(app)
      .post("/cart")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        cartId: 2,
        itemId: 2,
        quantity: 3,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select("quantity")
          .from("cart_item")
          .where({ id: res.body[0] })
          .first()
          .then(result => {
            expect(result.quantity).to.equal(6)
            done()
          }).catch(e => done(e))
      })
  })

  it("should change item quantity of cart if it already exists", done => {
    request(app)
      .post("/cart")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        cartId: 4,
        itemId: 100,
        quantity: 100,
        update: true,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select("quantity")
          .from("cart_item")
          .where({ id: res.body[0] })
          .first()
          .then(result => {
            expect(result.quantity).to.equal(100)
            done()
          }).catch(e => done(e))
      })
  })
})

describe("GET /cart/memberId", () => {
  it("should get active cart of member with id 1 when authorized", done => {
    request(app)
      .get("/cart/1")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("object")
          .to.have.a.property("cartId")
        expect(res.body.items).to.be.an("array")
          .to.be.empty
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should get active cart of member with id 3 when authorized", done => {
    const token3 = generateUserToken({
      userId: 3,
      roleId: 2,
      username: "anotheruser",
    })

    request(app)
      .get("/cart/3")
      .set("authorization", "Bearer " + token3)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("object")
        expect(res.body.items)
          .to.be.an("array")
        expect(res.body.items[1])
          .to.have.all.keys(
            "id",
            "item_id",
            "quantity",
            "sku",
            "name",
            "category",
            "description",
            "img",
            "price",
            "discount",
            "size",
            "rating",
          )
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get active cart of member with id 2 when authorized as id 1", done => {
    request(app)
      .get("/cart/2")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get active cart of member with id 1 when not authorized", done => {
    request(app)
      .get("/cart/1")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("DELETE /cart/memberId", () => {
  const token3 = generateUserToken({
    userId: 3,
    roleId: 2,
    username: "anotheruser",
  })

  it("should not remove cart_items of unauthenticated member", done => {
    request(app)
      .delete("/cart/3")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not remove cart_items of unauthorized member", done => {
    request(app)
      .delete("/cart/3")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should remove all cart_items of member with id 3", done => {
    request(app)
      .delete("/cart/3")
      .set("authorization", "Bearer " + token3)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("DELETE /cart/item/cartItemId", () => {
  it("should delete cart_item", async () => {
    const [ sampleCartItem ] = await db.insert({
        cart_id: 4,
        item_id: 3,
        quantity: 1,
      }, "id")
      .into("cart_item")

    try {
      await request(app)
        .delete("/cart/item/" + sampleCartItem)
        .set("authorization", "Bearer " + tokenUser)
        .expect(200)
    } catch (e) {
      console.log(e)
      throw e
    }
  })

  it("should send status 500 for nonexistent cart_item", (done) => {
    request(app)
      .delete("/cart/item/123123123")
      .set("authorization", "Bearer " + tokenUser)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not delete cart_item for unauthorized user", async () => {
    const [ sampleCartItem ] = await db.insert({
        cart_id: 4,
        item_id: 3,
        quantity: 1,
      }, "id")
      .into("cart_item")

    const token3 = generateUserToken({
      userId: 3,
      roleId: 2,
      username: "anotheruser",
    })

    try {
      await request(app)
        .delete("/cart/item/" + sampleCartItem)
        .set("authorization", "Bearer " + token3)
        .expect(403)
    } catch (e) {
      console.log(e)
      throw e
    }
  })
})

describe("GET /order", () => {
  it("should get all orders", done => {
    request(app)
      .get("/order")
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
