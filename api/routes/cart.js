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

module.exports = router
