const expect = require("chai").expect
const request = require("supertest")
const app = require("../index").app
const { generateUserToken } = require("../auth")
const bcrypt = require("bcryptjs")
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

describe("GET /store/item/itemId/rating", () => {
  it("should return all ratings for itemId 5", async function() {
    const [ newMemberId ] = await db.insert({
         "address" : "29715 1st Hill",
         "firstName" : "Danna",
         "email" : "dcosgriffn@cdbaby.com",
         "lastName" : "Cosgriff",
         "created_at" : "3/24/2015",
         "username" : "dcosgriffn",
         "gender" : "m",
         "password" : bcrypt.hashSync("aaba590eaf6354da94115dafdbe2b2a61f03331e0f78dba88b81b7b4b46ed6fa", 10),
         "birthdate " : "9/7/2001",
         "role_id" : 2,
       }, "id")
      .into("member")
    const [ newItemId ] = await db.insert({
        "sku" : "INEZFN7381",
        "name" : "Cherries - Frozen",
        "description" : "embrace enterprise infrastructures",
        "size_id" : 4,
        "img" : "http://dummyimage.com/221x135.bmp/dddddd/000000",
        "discount" : 98,
        "price" : 3038.42,
        "category_id" : 4
      }, "id")
      .into("item")
    const ratings = await db.insert([
        {
          "item_id" : newItemId,
          "comment" : "Future-proofed optimal moderator",
          "stars" : 1,
          "member_id" : newMemberId
        },
      ], "id")
      .into("rating")
    await request(app)
      .get(`/store/item/${newItemId}/rating`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).to.have.property("average")
          .to.be.a("number")
          .above(0)
        expect(body).to.have.property("ratings")
          .to.be.an("array")
          .with.lengthOf(ratings.length)
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
