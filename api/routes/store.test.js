const expect = require("chai").expect
const request = require("supertest")
const app = require("../index").app
const { generateUserToken } = require("../auth")

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

describe("GET /store/item/itemId/rating", () => {
  it("should return all ratings for itemId 5", async function() {
    await request(app)
      .get("/store/item/5/rating")
      .expect(200)
      .expect(({ body }) => {
        expect(body).to.have.property("average")
          .to.be.a("number")
          .above(0)
        expect(body).to.have.property("ratings")
          .to.be.an("array")
          .with.lengthOf(3)
          .to.have.property(0)
            .to.have.keys([
              "id",
              "memberId",
              "stars",
              "comment",
              "firstName",
              "avatar",
            ])
      })
  })

  it("should return empty ratings for invalid itemId", async function() {
    await request(app)
      .get("/store/item/51232317/rating")
      .expect(200)
      .expect(({ body }) => {
        expect(body).to.eql({ average: 0, ratings: []})
      })
  })

  it("should return 500 for invalid id", async function() {
    await request(app)
      .get("/store/item/asdflksadf/rating")
      .expect(500)
  })
})

describe("POST /store/item/itemId/rating", () => {
  it("should not add comment for unauthenticated user", async function() {
    await request(app)
      .post("/store/item/5/rating")
      .send({
        memberId: 2,
        stars: 3,
        comment: "This is a test comment",
      })
      .expect(401)
  })
  
  it("should not add comment for unauthorized user", async function() {
    await request(app)
      .post("/store/item/5/rating")
      .set("authorization", "Bearer " + tokenUser3)
      .send({
        memberId: 2,
        stars: 3,
        comment: "This is a test comment",
      })
      .expect(403)
  })

  it("should add comment of user with id 2 for item with id 5", async function() {
    await request(app)
      .post("/store/item/5/rating")
      .set("authorization", "Bearer " + tokenUser2)
      .send({
        memberId: 2,
        stars: 3,
        comment: "This is a test comment",
      })
      .expect(201)
  })

  it("should not add comment if user has already commented", async function() {
    await request(app)
      .post("/store/item/5/rating")
      .set("authorization", "Bearer " + tokenUser2)
      .send({
        memberId: 2,
        stars: 3,
        comment: "This is a test comment",
      })
      .expect(500)
  })
})
