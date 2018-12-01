const request = require("supertest")
const expect = require("chai").expect
const app = require("./index").app
const db = require("../db/knex")

before(done => {
  db.migrate.rollback().then(() => {
    return db.migrate.latest()
  }).then(() => {
    return db.seed.run()
  }).then(() => {
    done()
  })
})

describe("GET /member/id", () => {
  it("should return the member with id 2", done => {
    request(app)
      .get("/member/2")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.a.property("id")
        expect(res.body.id).to.be.equal(2)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("POST /member", () => {
  it("should register the user", done => {
    request(app)
      .post("/member")
      .send({
        firstName: "Tiffany",
        lastName: "Tester",
        email: "tif@test.com",
        username: "testtif",
        password: "passwordtiff",
        birthdate: "1990-01-01",
        address: "Somewhere in America",
      })
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an("array")
        expect(res.body).to.have.length(1)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should hash the user's password", done => {
    request(app)
      .post("/member")
      .send({
        firstName: "Gerald",
        lastName: "Gregor",
        email: "ger@mane.com",
        username: "geraldgreg",
        password: "shouldbehashed",
        birthdate: "2000-08-08",
        address: "18 Open Street, Ohio",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        db.select("password")
          .from("member")
          .where({id: res.body[0]})
          .first()
          .then(res => {
            expect(res).to.be.an("object")
            expect(res.password).to.not.be.equal("shouldbehashed")
            done()
        }).catch(e => done(e))
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

describe("GET /category/id", () => {
  it("should return the category with id 1", done => {
    request(app)
      .get("/category/1")
      .expect("content-type", /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.all.keys("id", "name")
        expect(res.body.id).to.be.equal(1)
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
      .expect("content-type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return featured items", done => {
    request(app)
      .get("/item")
      .query({"featured": ""})
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

describe("GET /item/id", () => {
  it("should return the item with id 1", done => {
    request(app)
      .get("/item/1")
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

  it("should return 404 with an invalid item id", done => {
    request(app)
      .get("/item/123")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /order/id", () => {
  it("should return the order with id 1", done => {
    request(app)
      .get("/order/1")
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

  it("should return 404 with an invalid order id", done => {
    request(app)
      .get("/order/12333")
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
