const request = require("supertest")
const expect = require("chai").expect
const app = require("../index").app
const {
  generateUserToken,
  findUserCredentials,
} = require("../auth")
const db = require("../../db/knex")

const tokenUser2 = generateUserToken({
  userId: 2,
  roleId: 2,
  username: "user",
})

const tokenUser3 = generateUserToken({
  userId: 3,
  roleId: 2,
  username: "rdyment0",
})

const tokenUser5 = generateUserToken({
  userId: 5,
  roleId: 2,
  username: "hminget2",
})

describe("PATCH /user/userId", () => {
  const newBirth = new Date(2010, 0, 1)

  it("should change user details with id 3", done => {
    request(app)
      .patch("/user/3")
      .set("authorization", "Bearer " + tokenUser3)
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

  it("should change password of user with id 5", async function() {
    await request(app)
      .patch("/user/5")
      .set("authorization", "Bearer " + tokenUser5)
      .send({
        password: "464aba6720fd3b0b402c925689035038680acbfb3c8a26712232d0083a2fe6bc",
        newPassword: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
      })
      .expect(200)

    expect(await findUserCredentials("hminget2", "P@ssw0rd")).to.be.an("object")
      .with.property("username")
      .to.equal("hminget2")
  })

  it("should not update member detail of unauthorzied member", done => {
    request(app)
      .patch("/user/3")
      .set("authorization", "Bearer " + tokenUser2)
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
      .patch("/user/3")
      .set("authorization", "Bearer " + tokenUser3)
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

describe("GET /user/userId/order", () => {
  it("should retrieve all orders of user 2", async function() {
    await request(app)
      .get("/user/2/order")
      .set("authorization", "Bearer " + tokenUser2)
      .expect(200)
      .expect("content-type", /json/)
      .expect(({ body: response }) => {
        expect(response).to.have.keys(["total", "items"])
        expect(response.items).to.have.lengthOf(3)
      })
  })

  it("should not retrieve orders of user 2 if not authorized", async function() {
    await request(app)
      .get("/user/2/order")
      .set("authorization", "Bearer " + tokenUser3)
      .expect(403)
  })

  it("should not retrieve orders of user 2 if not authenticated", async function() {
    await request(app)
      .get("/user/2/order")
      .expect(401)
  })

  it("should return 401 for invalid userId", async function() {
    const tokenInvalidUser = generateUserToken({
      userId: 912323,
      roleId: 2,
      username: "user",
    })
    await request(app)
      .get("/user/912323/order")
      .set("authorization", "Bearer " + tokenInvalidUser)
      .expect(401)
  })
})
