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
  it("should create a new member if authorized", async function() {
    await request(app)
      .post("/member")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        firstName: "Post",
        lastName: "Member",
        username: "postmemberrandom",
        email: "random@random.com",
        gender: "Male",
        role: "admin",
      })
      .expect(201)

    const insertedMember = await db.select([
        "firstName",
        "lastName",
        "username",
        "email",
        "gender",
        "role_id",
      ])
      .from("member")
      .where({ username: "postmemberrandom" })
      .first()
    expect(insertedMember).to.deep.include({
      firstName: "Post",
      lastName: "Member",
      username: "postmemberrandom",
      email: "random@random.com",
      gender: "m",
      role_id: 1,
    })
  })

  it("should not create a new member if not authorized as admin", done => {
    request(app)
      .post("/member")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        firstName: "Post",
        lastName: "Member",
        username: "shouldnotbeadded",
        email: "shouldnotadd@member.com",
        role: "user",
      })
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not create a new member if not authenticated", done => {
    request(app)
      .post("/member")
      .send({
        firstName: "Post",
        lastName: "Member",
        username: "notauthenticatedme",
        email: "iamnotauthenticated@member.com",
        role: "user",
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("PATCH /member/id", () => {
  it("should update details of user with id 3 and change role to admin", done => {
    request(app)
      .patch("/member/3")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        username: "changed",
        role: "admin",
        gender: "Female",
      })
      .expect(204)
      .end((err, res) => {
        if (err) return done(err)
        db.select([
            "username",
            "role_id",
          ])
          .from("member")
          .where({ id: 3 })
          .first()
          .then(data => {
            expect(data).to.eql({
              username: "changed",
              role_id: 1,
            })
            done()
        }).catch(done)
      })
  })

  it("should update details of user with id 4 and change role to user", done => {
    request(app)
      .patch("/member/4")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        username: "testroleunchanged",
      })
      .expect(204)
      .end((err, res) => {
        if (err) return done(err)
        db.select([
            "username",
            "role_id",
          ])
          .from("member")
          .where({ id: 4 })
          .first()
          .then(data => {
            expect(data).to.eql({
              username: "testroleunchanged",
              role_id: 2,
            })
            done()
        }).catch(done)
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
      .patch("/member/3")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        wrong: "field",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("DELETE /member/id", () => {
  const insertQuery = db.insert({
      firstName: "Test",
      lastName: "Test",
      email: "test@email.test",
      username: "testusername",
      password: "testpass",
      role_id: 2,
    }, "id")
    .into("member")
    
  it("should delete the inserted member", async function() {
    const [ insertedId ] = await insertQuery

    const insertedMember = await db.select("id")
      .from("member")
      .where({ id: insertedId })
      .first()
    expect(insertedMember).to.eql({ id: insertedId })

    await request(app)
      .delete(`/member/${insertedId}`)
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(204)

    const deletedMember = await db.select("id")
      .from("member")
      .where({ id: insertedId })
      .first()
    expect(deletedMember).to.be.undefined
  })

  it("should not delete member if unathorized user", async function() {
    await request(app)
      .delete(`/member/5`)
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
  })

  it("should not delete member if unauthenticated", async function() {
    await request(app)
      .delete(`/member/5`)
      .expect(401)
  })

  it("should return 404 for nonexistent member", async function() {
    await request(app)
      .delete(`/member/51239123`)
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(404)
  })
})

describe("POST /item", () => {
  it("should add a new item for authorized admin", (done) => {
    request(app)
      .post("/item")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        sku: "abc123",
        name: "Item abc 123",
        category: "Swimsuits",
        description: "Item abc 123 is a swimsuit",
        img: "",
        price: 1000,
        discount: 0,
        size: "sm",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        db.select([
            "sku",
            "name",
            "category_id",
            "description",
            "img",
            "price",
            "discount",
            "size_id",
          ])
          .from("item")
          .where({ sku: "abc123" })
          .first()
          .then((item) => {
            expect(item).to.eql({
              sku: "abc123",
              name: "Item abc 123",
              category_id: 4,
              description: "Item abc 123 is a swimsuit",
              img: "",
              price: "1000.000000",
              discount: "0.000000",
              size_id: 2,
            })
            done()
          }).catch(done)
      })
  })

  it("should not add item for unauthorized user", (done) => {
    request(app)
      .post("/item")
      .set("authorization", "Bearer " + tokenUser)
      .send({
        sku: "abc123",
        name: "Item abc 123",
        category: "Swimsuits",
        description: "Item abc 123 is a swimsuit",
        img: "",
        price: 1000,
        discount: 0,
        size: "sm",
      })
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not add item for unauthenticated user", (done) => {
    request(app)
      .post("/item")
      .send({
        sku: "abc123",
        name: "Item abc 123",
        category: "Swimsuits",
        description: "Item abc 123 is a swimsuit",
        img: "",
        price: 1000,
        discount: 0,
        size: "sm",
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not add item with abnormal fields", (done) => {
    request(app)
      .post("/item")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        what: "is this",
        a: 1,
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("PATCH /item/id", () => {
  it("should update item with id 1", (done) => {
    request(app)
      .patch("/item/1")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        name: "Changed Item Name"
      })
      .expect(204)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update item if not authorized as admin", (done) => {
    request(app)
      .patch("/item/1")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update item if not authenticated", (done) => {
    request(app)
      .patch("/item/1")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update invalid item id", (done) => {
    request(app)
      .patch("/item/19999999")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update invalid item fields", (done) => {
    request(app)
      .patch("/item/19999999")
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        asdf: "hehe"
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("DELETE /item/id", () => {
  const insertQuery = db.insert({
      sku: "testskufordeletion",
      name: "testnamefordeletion",
      category_id: 1,
      description: "testdescription",
      price: 1,
    }, "id")
    .into("item")

  it("should delete item", async function() {
    const [ insertedId ] = await insertQuery

    const insertedItem = await db.select("id")
      .from("item")
      .where({ id: insertedId })
      .first()
    expect(insertedItem).to.eql({ id: insertedId })

    await request(app)
      .delete(`/item/${insertedId}`)
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(204)

    const deletedItem = await db.select("id")
      .from("item")
      .where({ id: insertedId })
      .first()
    expect(deletedItem).to.be.undefined
  })

  it("should not delete item if not authorized as admin", function(done) {
    request(app)
      .delete("/item/100")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not delete item if not authenticated", function(done) {
    request(app)
      .delete("/item/100")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not delete item if non existent", function(done) {
    request(app)
      .delete("/item/88899898")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /status", () => {
  it("should retrieve all statuses if authorized as admin", function(done) {
    request(app)
      .get("/status")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("array")
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not retrieve statuses if not authorized as admin", function(done) {
    request(app)
      .get("/status")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not retrieve statuses if not authenticated", function(done) {
    request(app)
      .get("/status")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /order", () => {
  it("should get all orders if authorized as admin", function(done) {
    request(app)
      .get("/order")
      .set("authorization", "Bearer " + tokenAdmin)
      .expect(200)
      .expect("content-type", /json/)
      .expect(res => {
        expect(res.body).to.be.an("object")
          .with.property("total")
          .to.be.a("number")
          .above(0)
          .that.satisfies(Number.isInteger)
        expect(res.body).to.be.an("object")
          .with.property("items")
          .to.be.an("array")
          .with.property("0")
          .with.keys([
            "id",
            "memberId",
            "orderAt",
            "shipTo",
            "status",
            "shipAt",
            "deliverAt",
            "shipMethod",
            "payMethod",
            "paypalPaymentSid",
          ])
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get any order if not authorized as admin", function(done) {
    request(app)
      .get("/order")
      .set("authorization", "Bearer " + tokenUser)
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get any order if not authenticated", function(done) {
    request(app)
      .get("/order")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should limit returned orders by 5", function(done) {
    request(app)
      .get("/order")
      .set("authorization", "Bearer " + tokenAdmin)
      .query({ limit: 5 })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.a.property("items")
          .to.be.an("array")
          .with.lengthOf(5)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should skip returned orders by 5", function(done) {
    request(app)
      .get("/order")
      .set("authorization", "Bearer " + tokenAdmin)
      .query({ offset: 5 })
      .expect(200)
      .expect((res) => {
        expect(res.body)
          .to.have.nested.property("items[0].id", 6)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should return 5 orders ordered by id descending", function(done) {
    request(app)
      .get("/order")
      .set("authorization", "Bearer " + tokenAdmin)
      .query({ limit: 5, orderBy: "id", descending: true })
      .expect(200)
      .expect((res) => {
        expect(res.body)
          .to.have.property("items")
          .with.lengthOf(5)
      })
      .expect(res => {
        expect(res.body).to.have.property("items")
          .with.lengthOf(5)
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
})

describe("PATCH /order", () => {
  const insertQuery = db.insert({
      member_id: 1,
      order_at: new Date(),
      ship_to: "Test address",
      status_id: 1,
      ship_method_id: 1,
      pay_method_id: 1,
    }, "id")
    .into("order")
  let insertedOrderId

  it("should update order if authorized as admin", async function() {
    const [ id ] = await insertQuery
    insertedOrderId = id

    await request(app)
      .patch(`/order/${insertedOrderId}`)
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        status: "Approved",
      })
      .expect(204)
  })

  it("should not update order if not authorized as admin", function(done) {
    request(app)
      .patch(`/order/${insertedOrderId}`)
      .set("authorization", "Bearer " + tokenUser)
      .send({
        status: "Approved",
      })
      .expect(403)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update order if not authenticated", function(done) {
    request(app)
      .patch(`/order/${insertedOrderId}`)
      .send({
        status: "Approved",
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not update order for erroneous fields", function(done) {
    request(app)
      .patch(`/order/${insertedOrderId}`)
      .set("authorization", "Bearer " + tokenAdmin)
      .send({
        erroneous: "Fields",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
    
  })
})
