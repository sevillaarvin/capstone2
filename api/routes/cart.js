const express = require("express")
const router = express.Router()
const { authenticate } = require("../auth")
const db = require("../../db/knex")
const {
  convertRating,
} = require("../utilities")

router.post("/cart", authenticate, async (req, res, next) => {
  const { user } = res.locals
  const {
    cartId: cart_id,
    itemId: item_id,
    quantity,
    update,
  } = req.body
  let result

  try {
    const { member_id: memberId } = await db.select("member_id")
      .from("cart")
      .where({ id: cart_id })
      .first()

    if (memberId !== user.userId) {
      res.status(403).send()
      return
    }

    // Check if already existing
    const cartItem = await db.select("quantity")
      .from("cart_item")
      .where({ cart_id, item_id })
      .first()

    if (!cartItem) {
      // Add if not existing
      result = await db.insert({
          cart_id,
          item_id,
          quantity,
        }, "id")
        .into("cart_item")
    } else {
      const newQuantity = update ? quantity : cartItem.quantity + quantity

      result = await db("cart_item")
        .where({ cart_id, item_id })
        .update({
          quantity: newQuantity,
        }, "id")
    }
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send(result)
})

router.get("/cart/:member_id", authenticate, async (req, res, next) => {
  const { user } = res.locals
  const { member_id } = req.params
  let cart
  let items

  // Only deep equality since typeof userId is string
  if (!(user.userId == member_id))  {
    res.status(401).send()
    return
  }

  try {
    // Get cart parent
    // undefined if no cart or all carts are full
    cart = await db.select([
        "id",
        "member_id",
        "order_id",
      ])
      .from("cart")
      .where({
        member_id,
        order_id: null,
      })
      .first()

    // If user has no cart, create cart
    if (!cart) {
      const newCart = await db.insert({
          member_id
        }, "id")
        .into("cart")
      cart = await db.select([
          "id",
          "member_id",
          "order_id",
        ])
        .from("cart")
        .where({
          member_id,
          order_id: null,
        })
        .first()
    }

    items = await db.select([
        "cart_item.id as id",
        // "cart_item.cart_id",
        "cart_item.item_id",
        "cart_item.quantity",
        "item.sku",
        "item.name",
        "category.name as category",
        "item.description",
        "item.img",
        "item.price",
        "item.discount",
        "size.name as size"
      ])
      .from("cart_item")
      .where({ "cart_item.cart_id": cart.id })
      .innerJoin("item", "item.id", "cart_item.item_id")
      .avg("rating.stars as rating")
      // Category is required
      .innerJoin("category", "item.category_id", "category.id")
      // Size is not required
      .leftJoin("size", "item.size_id", "size.id")
      .leftJoin("rating", "item.id", "rating.item_id")
      .groupBy(["cart_item.id", "item.id", "category.name", "size.name"])
      .orderBy("cart_item.id")

    convertRating(items)
  } catch (e) {
    res.status(500).send()
  }

  res.status(200).send({
    cartId: cart.id,
    items,
  })
})

router.delete("/cart/:member_id", authenticate, async (req, res) => {
  const { user } = res.locals
  const { member_id } = req.params

  if (user.userId != member_id) {
    res.status(403).send()
    return
  }

  try {
    const cart = await db.select([
        "id",
      ])
      .from("cart")
      .where({
        member_id,
        order_id: null,
      })
      .first()

    if (!cart) {
      res.status(400).send()
      return
    }

    await db("cart_item")
      .where({ cart_id: cart.id })
      .del()
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send()
})

router.delete("/cart/item/:cartItemId", authenticate, async (req, res) => {
  const { user } = res.locals
  const { cartItemId } = req.params

  try {
    const { member_id } = await db.select("cart.member_id")
      .from("cart_item")
      .where({ "cart_item.id": cartItemId })
      .innerJoin("cart", "cart.id", "cart_item.cart_id")
      .first()

    if (user.userId !== member_id) {
      res.status(403).send()
      return
    }

    await db("cart_item")
      .where({ id: cartItemId })
      .del()
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send()
})

router.get("/ship_method", authenticate, async (req, res) => {
  try {
    const ship_methods = await db.select("name")
      .from("ship_method")
    res.status(200).send(ship_methods)
  } catch (e) {
    res.status(500).send()
  }
})

router.get("/pay_method", authenticate, async (req, res) => {
  try {
    const pay_methods = await db.select("name")
      .from("pay_method")
    res.status(200).send(pay_methods)
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/checkout", authenticate, async (req, res) => {
  const { user } = res.locals
  const { userId: member_id } = user
  // receive cartId
  const {
    cartId: cart_id,
    address,
    shipMethod, // Economy, VIP
    payMethod, // COD, PayPal
  } = req.body
  // TODO: Validate address and other inputs
  let order_summary
  let order_items

  try {
    // confirm that user is authorized
    const cart = await db.select("id")
      .from("cart")
      .where({
        id: cart_id,
        member_id,
        // confirm that cartId order_id is null
        order_id: null,
      })
      .first()

    if (!cart) {
      res.status(400).send()
      return
    }

    // assign order_id for cartId
    const { id: ship_method_id } = await db.select("id")
      .from("ship_method")
      .where({ name: shipMethod })
      .first()

    const { id: pay_method_id } = await db.select("id")
      .from("pay_method")
      .where({ name: payMethod })
      .first()

    const [ order_id ] = await db.insert({
        member_id,
        ship_to: address,
        ship_method_id,
        pay_method_id,
      }, "id")
      .into("order")

    // update order_id in cart
    await db("cart")
      .where({ id: cart_id })
      .update({ order_id })

    // assign order_detail for cart_item
    let cartItems = await db.select([
        "cart_item.item_id",
        "cart_item.quantity",
        "item.price",
        "item.discount",
      ])
      .from("cart_item")
      .where({ cart_id })
      .innerJoin("item", "item.id", "cart_item.item_id")

    cartItems = cartItems.map(item => {
      item.order_id = order_id
      return item
    })

    await db.insert(cartItems)
      .into("order_detail")

    // send back order details
    order_summary = await db.select([
        "member.firstName as firstName",
        "member.lastName as lastName",
        "order.id as orderId",
        "order_at as orderAt",
        "ship_to as shipTo",
        "status.name as status",
        "ship_method.name as shipMethod",
        "pay_method.name as payMethod",
      ])
      .from("order")
      .where({ "order.id": order_id })
      .innerJoin("member", "member.id", "order.member_id")
      .innerJoin("status", "status.id", "order.status_id")
      .innerJoin("ship_method", "ship_method.id", "order.ship_method_id")
      .innerJoin("pay_method", "pay_method.id", "order.pay_method_id")
      .first()

    order_items = await db.select([
        "item.sku",
        "item.name",
        "category.name as category",
        "item.description",
        "item.img",
        "size.name as size",
        "order_detail.quantity",
        "order_detail.price",
        "order_detail.discount",
      ])
      .from("order_detail")
      .where({ order_id })
      .innerJoin("item", "item.id", "order_detail.item_id")
      .innerJoin("category", "category.id", "item.category_id")
      .leftJoin("size", "size.id", "item.size_id")
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send({
    ...order_summary,
    items: order_items
  })
})

module.exports = router
