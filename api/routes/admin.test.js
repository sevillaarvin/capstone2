const request = require("supertest")
const expect = require("chai").expect
const app = require("../index").app
const { generateUserToken, verifyUserToken } = require("../auth")
const db = require("../../db/knex")

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

describe("POST /member", () => {
  it("should create a new member", done => {
    request(app)
      .post("/member")
      .set("authorization", "Bearer " + tokenAdmin)
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
