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
        confirmPassword: "test",
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
        confirmPassword: "shouldbehashed",
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
        confirmPassword: "shouldbehashed",
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

  it("should not register when password does not match", async function() {
    await request(app)
      .post("/signup")
      .send({
        firstName: "hmmm",
        lastName: "hmmm",
        email: "what@the.fff",
        username: "whattheff",
        password: "shouldbehashed",
        confirmPassword: "asddf",
        birthdate: "2000-08-08",
        address: "18 Open Street, Ohio",
      })
      .expect(400)
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
        expect(res.body).to.be.an("object")
          .with.property("items")
        expect(res.body.items[0]).to.have.keys([
          "id",
          "sku",
          "name",
          "category",
          "description",
          "img",
          "price",
          "discount",
          "quantity",
          "rating",
          "size",
        ])
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
        expect(res.body).to.be.an("object")
          .with.property("items")
          .with.lengthOf(5)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return the category with matching name skipping 10 items", async function() {
    const newItems = await db.insert([
        {
          "category_id" : 1,
          "price" : 2900,
          "description" : "orchestrate mission-critical synergies",
          "sku" : "MGWRLW7280",
          "name" : "Apple - Macintosh",
          "size_id" : 5,
          "img" : "http://dummyimage.com/247x240.png/5fa2dd/ffffff",
          "discount" : null
        },
        {
          "description" : "extend best-of-breed convergence",
          "name" : "Wine - Touraine Azay - Le - Rideau",
          "sku" : "NDOPVT9147",
          "size_id" : 3,
          "img" : "http://dummyimage.com/171x116.png/dddddd/000000",
          "discount" : 213,
          "category_id" : 1,
          "price" : 9556.32
        },
        {
          "size_id" : 2,
          "description" : "redefine global systems",
          "sku" : "JCASCZ6648",
          "name" : "Chilli Paste, Ginger Garlic",
          "discount" : null,
          "img" : "http://dummyimage.com/159x185.bmp/5fa2dd/ffffff",
          "category_id" : 1,
          "price" : 907.78
        },
        {
          "description" : "incentivize turn-key technologies",
          "name" : "Leeks - Large",
          "sku" : "CEFIXN8879",
          "size_id" : 3,
          "img" : "http://dummyimage.com/175x239.png/dddddd/000000",
          "discount" : 412,
          "category_id" : 1,
          "price" : 2591.67
        },
        {
          "category_id" : 1,
          "price" : 3086.28,
          "img" : "http://dummyimage.com/213x173.bmp/ff4444/ffffff",
          "discount" : null,
          "description" : "evolve world-class mindshare",
          "name" : "Wine - Kwv Chenin Blanc South",
          "sku" : "EOQKJO7948",
          "size_id" : 2
        },
        {
          "category_id" : 1,
          "price" : 4337.72,
          "description" : "reinvent intuitive interfaces",
          "name" : "Spring Roll Wrappers",
          "sku" : "ZKCJTS6351",
          "size_id" : 4,
          "img" : "http://dummyimage.com/225x131.jpg/ff4444/ffffff",
          "discount" : 397
        },
        {
          "category_id" : 1,
          "price" : 8565.04,
          "size_id" : 2,
          "description" : "maximize global experiences",
          "name" : "Honey - Lavender",
          "sku" : "VYPLVS2349",
          "discount" : null,
          "img" : "http://dummyimage.com/202x176.bmp/5fa2dd/ffffff"
        },
        {
          "category_id" : 1,
          "price" : 668.62,
          "size_id" : 5,
          "description" : "integrate sticky relationships",
          "sku" : "QMPGRL5867",
          "name" : "Cabbage - Green",
          "discount" : 466,
          "img" : "http://dummyimage.com/227x208.jpg/dddddd/000000"
        },
        {
          "name" : "Garam Marsala",
          "sku" : "NMPULP4689",
          "description" : "target global paradigms",
          "size_id" : 1,
          "img" : "http://dummyimage.com/227x105.bmp/5fa2dd/ffffff",
          "discount" : 321,
          "price" : 8429.52,
          "category_id" : 1
        },
        {
          "price" : 3022.13,
          "category_id" : 1,
          "sku" : "ALYABO4204",
          "name" : "Country Roll",
          "description" : "mesh end-to-end deliverables",
          "size_id" : 2,
          "img" : "http://dummyimage.com/177x180.jpg/5fa2dd/ffffff",
          "discount" : null
        },
      ])
      .into("item")

    let result
    await request(app)
      .get("/category/Swimming Equipment")
      .query({ offset: 10 })
      .expect(200)
      .expect(res => {
        result = res.body
        expect(res.body).to.be.an("object")
          .with.keys([
            "total",
            "items",
          ])
      })
    const swimItems = await db.select(["item.id", "category.name as category"])
      .from("item")
      .where({ "category.name": "Swimming Equipment" })
      .innerJoin("category", "item.category_id", "category.id")
      .orderBy("item.id")
    expect(result.items[0].id).to.equal(swimItems[10].id)
  })

  it("should return 3 items for search term 'xyz'", async function() {
    const newItems = await db.insert([
        {
          "price" : 9038.05,
          "category_id" : 1,
          "discount" : 125,
          "img" : "http://dummyimage.com/151x242.png/cc0000/ffffff",
          "size_id" : 3,
          "sku" : "YZPNIS9578",
          "name" : "xyz This is item1",
          "description" : "drive revolutionary experiences"
        },
        {
          "size_id" : 2,
          "name" : "This is item2",
          "sku" : "PZESLF3359",
          "description" : "xyz aggregate B2B e-tailers",
          "discount" : null,
          "img" : "http://dummyimage.com/213x209.jpg/ff4444/ffffff",
          "price" : 9457.35,
          "category_id" : 1
        },
        {
          "discount" : 398,
          "img" : "http://dummyimage.com/202x131.bmp/dddddd/000000",
          "size_id" : null,
          "sku" : "NDFQOJ9103",
          "name" : "This is item xyz 3",
          "description" : "extend transparent platforms",
          "price" : 2489.64,
          "category_id" : 1
        },
        {
          "category_id" : 2,
          "price" : 8477.52,
          "size_id" : 3,
          "description" : "xyz generate best-of-breed functionalities",
          "name" : "Cheese - Roquefort Pappillon",
          "sku" : "XRDFOY3241",
          "discount" : 245,
          "img" : "http://dummyimage.com/117x219.jpg/5fa2dd/ffffff"
        },
        {
          "price" : 9399.95,
          "category_id" : 4,
          "size_id" : 2,
          "sku" : "FKBKTB0115",
          "name" : "Veal - xyz Tenderloin, Untrimmed",
          "description" : "grow end-to-end methodologies",
          "discount" : 405,
          "img" : null
        },
        {
          "discount" : 469,
          "img" : "http://dummyimage.com/169x211.png/ff4444/ffffff",
          "size_id" : 5,
          "sku" : "MAJFWG2066",
          "name" : "Pork - Butt, Boneless",
          "description" : "unleash xyz 24/365 web-readiness",
          "price" : 4712.1,
          "category_id" : 3
        },
      ])
      .into("item")

    await request(app)
      .get("/category/Swimming Equipment")
      .query({
        search: "xyz",
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).to.have.property("total")
          .to.equal(3)
        expect(body).to.have.property("items")
          .to.have.lengthOf(3)
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
            "quantity",
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
    const newItems = await db.insert([
        {
          "size_id" : 4,
          "description" : "visualize revolutionary e-commerce",
          "name" : "Cake - Pancake abc123",
          "sku" : "TBYUSD6434",
          "discount" : 51,
          "img" : "http://dummyimage.com/145x165.bmp/cc0000/ffffff",
          "category_id" : 4,
          "price" : 7012.03
        },
        {
          "price" : 677.57,
          "category_id" : 4,
          "sku" : "FNWCXH5942",
          "name" : "Rum - Coconut, abc123 Malibu",
          "description" : "monetize interactive supply-chains",
          "size_id" : 3,
          "img" : "http://dummyimage.com/240x218.jpg/5fa2dd/ffffff",
          "discount" : null
        },
        {
          "sku" : "JBRMSF1587",
          "name" : "abc123 Pork - Shoulder",
          "description" : "redefine e-business channels",
          "size_id" : 5,
          "img" : "http://dummyimage.com/100x137.png/dddddd/000000",
          "discount" : 309,
          "price" : 4776.29,
          "category_id" : 3
        },
        {
          "category_id" : 3,
          "price" : 5291.57,
          "size_id" : 4,
          "description" : "transform dot-com e-tailers abc123",
          "sku" : "BMRWOH3523",
          "name" : "Sausage - Andouille",
          "discount" : 459,
          "img" : "http://dummyimage.com/220x215.bmp/5fa2dd/ffffff"
        },
        {
          "size_id" : 3,
          "name" : "Pants Custom Dry Clean",
          "sku" : "HEKBPQ7180",
          "description" : "scale abc123 collaborative partnerships",
          "discount" : 446,
          "img" : "http://dummyimage.com/191x135.png/cc0000/ffffff",
          "price" : 5031.28,
          "category_id" : 3
        },
      ], "id")
      .into("item")

    await request(app)
      .get("/item")
      .query({
        search: "abc123"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property("items")
          .to.have.lengthOf(newItems.length)
      })
  })
})

describe("GET /item/sku", () => {
  it("should return the item with sku VXYIWV3367", done => {
    request(app)
      .get("/item/VXYIWV3367")
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.have.keys([
          "id",
          "sku",
          "name",
          "category",
          "description",
          "img",
          "price",
          "discount",
          "quantity",
          "size",
          "rating",
        ])
        expect(res.body).to.include({ sku: "VXYIWV3367" })
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 404 with an invalid item sku", done => {
    request(app)
      .get("/item/asdfasdf")
      .expect(404)
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
