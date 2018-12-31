const request = require("supertest")
const expect = require("chai").expect
const app = require("../index").app
const { generateUserToken } = require("../auth")
const db = require("../../db/knex")

const tokenUser2 = generateUserToken({
  userId: 2,
  roleId: 2,
  username: "user",
})

const tokenUser3 = generateUserToken({
  userId: 3,
  roleId: 2,
  username: "user",
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
