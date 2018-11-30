const request = require("supertest")
const expect = require("chai").expect
const router = require("./index").handler
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

describe("GET /item", () => {
  it("should return all items", done => {
    request(router)
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
