const request = require("supertest")
const expect = require("chai").expect
const app = require("../index").app
const {
  generateUserToken,
  verifyUserToken
} = require("../auth")
const bcrypt = require("bcryptjs")
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

  it("should change item quantity of cart if it already exists", async function() {
    const [ member_id ] = await db.insert({
       "username" : "lwellando",
       "gender" : "f",
       "password" : bcrypt.hashSync("537bade88345283e1cb794aa8230f377ff0a80e39cc3d1a06190cf8f6a49b8d7", 10),
       "birthdate " : "10/6/2007",
       "address" : "839 Dorton Alley",
       "firstName" : "Lemmy",
       "email" : "lwellando@vk.com",
       "lastName" : "Welland",
       "created_at" : "4/24/2010",
       "role_id" : 2,
    }, "id").into("member")
    const tokenNewMember = generateUserToken({
      userId: member_id,
      roleId: 2,
      username: "user",
    })
    const [ cart_id ] = await db.insert({
        member_id,
      }, "id")
      .into("cart")
    const [ item_id ] = await db.insert({
        "category_id" : 2,
        "price" : 2956.58,
        "img" : "http://dummyimage.com/121x133.png/5fa2dd/ffffff",
        "discount" : null,
        "description" : "utilize cross-platform solutions",
        "sku" : "VOYLBA5343",
        "name" : "Banana Turning",
        "size_id" : 5
      }, "id")
      .into("item")
    await db.insert({
        cart_id,
        item_id,
        quantity: 10
      })
      .into("cart_item")

    let result
    await request(app)
      .post("/cart")
      .set("authorization", "Bearer " + tokenNewMember)
      .send({
        cartId: cart_id,
        itemId: item_id,
        quantity: 100,
        update: true,
      })
      .expect((res) => {
        result = res.body
      })
      .expect(200)

    const { quantity } = await db.select("quantity")
      .from("cart_item")
      .where({ id: result[0] })
      .first()
    expect(quantity).to.equal(100)
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
      throw e
    }
  })
})

describe("GET /ship_method", () => {
  it("should get all ship methods if authenticated", (done) => {
    request(app)
      .get("/ship_method")
      .set("authorization", "Bearer " + tokenUser)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("array")
          .to.have.lengthOf(2)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get ship methods if not authenticated", (done) => {
    request(app)
      .get("/ship_method")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("GET /pay_method", () => {
  it("should get all pay methods if authenticated", (done) => {
    request(app)
      .get("/pay_method")
      .set("authorization", "Bearer " + tokenUser)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an("array")
          .to.have.lengthOf(2)
      })
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not get pay methods if not authenticated", (done) => {
    request(app)
      .get("/pay_method")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe("POST /checkout", () => {
  const token3 = generateUserToken({
    userId: 3,
    roleId: 2,
    username: "asdf",
  })
  const token4 = generateUserToken({
    userId: 4,
    roleId: 2,
    username: "asdf",
  })

  it("should not checkout items for unauthenticated user", done => {
    request(app)
      .post("/checkout")
      .send({
        cartId: 4,
        address: "Test address",
        shipMethod: "Economy",
        payMethod: "COD",
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should not checkout items for unauthorized user", done => {
    request(app)
      .post("/checkout")
      .set("authorization", "Bearer " + token3)
      .send({
        cartId: 4,
        address: "Test address",
        shipMethod: "Economy",
        payMethod: "COD",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it("should checkout items for user 3 using COD", async () => {
    let result

    const [ cartId ] = await db.insert({
        member_id: 3,
      }, "id")
      .into("cart")

    await db.insert([
        {
          cart_id: cartId,
          item_id: 1,
          quantity: 1,
        },
        {
          cart_id: cartId,
          item_id: 2,
          quantity: 2,
        },
      ])
      .into("cart_item")

    try {
      await request(app)
        .post("/checkout")
        .set("authorization", "Bearer " + token3)
        .send({
          cartId,
          address: "Test address",
          shipMethod: "Economy",
          payMethod: "COD",
        })
        .expect(200)
        .expect("content-type", /json/)
        .expect(res => {
          result = res.body
          expect(res.body).to.have.all.keys(
            "firstName",
            "lastName",
            "orderId",
            "orderAt",
            "shipTo",
            "status",
            "shipMethod",
            "payMethod",
            "items",
          )
          expect(res.body.items).to.be.an("array")
            .to.have.lengthOf(2)
          expect(res.body.items[0]).to.have.all.keys(
            "sku",
            "name",
            "category",
            "description",
            "img",
            "size",
            "quantity",
            "price",
            "discount",
          )
        })

      const cart = await db.select("order_id")
        .from("cart")
        .where({ id: cartId })
        .first()
      expect(cart.order_id).to.equal(result.orderId)

      const order = await db.select([
          "ship_to",
          "status_id",
          "ship_method_id",
          "pay_method_id",
        ])
        .from("order")
        .where({ id: result.orderId })
        .first()

      expect(order).to.eql({
        ship_to: "Test address",
        // status of COD automatically approved
        status_id: 2,
        ship_method_id: 1,
        pay_method_id: 1,
      })

      const order_detail = await db.select([
          "item_id",
          "quantity",
        ])
        .from("order_detail")
        .where({ order_id: result.orderId })
      
      expect(order_detail).to.have.deep.members([
        {
          item_id: 1,
          quantity: 1,
        },
        {
          item_id: 2,
          quantity: 2,
        },
      ])
    } catch (e) {
      throw e
    }
  })

  it("should not deduct quantity of items after failed checkout", async function() {
    let result

    const [ cartId ] = await db.insert({
        member_id: 4,
      }, "id")
      .into("cart")

    await db.insert([
        {
          cart_id: cartId,
          item_id: 3,
          quantity: 999,
        },
        {
          cart_id: cartId,
          item_id: 4,
          quantity: 999,
        },
      ])
      .into("cart_item")

    await request(app)
      .post("/checkout")
      .set("authorization", "Bearer " + token4)
      .send({
        cartId,
        address: "Test address",
        shipMethod: "Economy",
        payMethod: "COD",
      })
      .expect(409)

    const { order_id } = await db.select("order_id")
      .from("cart")
      .where({ id: cartId })
      .first()
    expect(order_id).to.be.null

    const items = await db.select([
        "id",
        "quantity"
      ])
      .from("item")
      .where({ id: 3 })
      .orWhere({ id: 4 })
    expect(items).to.have.deep.members([{
      id: 3,
      quantity: 3,
    }, {
      id: 4,
      quantity: 4,
    }])
  })

  // it("should checkout items for user 3 using PayPal", async function() {
  //   this.timeout(10000)

  //   let result

  //   const [ cartId ] = await db.insert({
  //       member_id: 3,
  //     }, "id")
  //     .into("cart")

  //   await db.insert([
  //       {
  //         cart_id: cartId,
  //         item_id: 1,
  //         quantity: 1,
  //       },
  //       {
  //         cart_id: cartId,
  //         item_id: 2,
  //         quantity: 2,
  //       },
  //     ])
  //     .into("cart_item")

  //   try {
  //     await request(app)
  //       .post("/checkout")
  //       .set("authorization", "Bearer " + token3)
  //       .send({
  //         cartId,
  //         address: "Test address",
  //         shipMethod: "Economy",
  //         payMethod: "PayPal",
  //       })
  //       .expect(202)
  //   } catch (e) {
  //     throw e
  //   }
  // })
})
