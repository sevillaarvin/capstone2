const express = require("express")
const router = express.Router()
const db = require("../../db/knex")
const { authenticate } = require("../auth")

router.get("/:userId/order", authenticate, async (req, res) => {
  const {
      user: {
          userId
      } = {}
  } = res.locals || {}
  const { userId: member_id } = req.params

  if (!(userId == member_id)) {
    res.status(403).send()
    return
  }

  try {
    const { count } = await db("order")
      .where({ member_id })
      .count("id")
      .first()
    const total = Number(count)

    // Retrieve all orders
    const orders = await db.select([
        "order.id",
        "order.order_at",
        "order.ship_to",
        "status.name as status",
        "order.ship_at",
        "order.deliver_at",
      ])
      .from("order")
      .where({ member_id })
      .innerJoin("status", "status.id", "order.status_id")

    // Retrieve all order details
    const items = await Promise.all(
      orders.map(async (order) => {
        order.items = await db.select([
            "order_detail.quantity",
            "order_detail.price",
            "item.id",
            "item.sku",
            "item.name",
            "category.name as category",
            "item.description",
            "item.img",
            "size.name as size",
          ])
          .from("order_detail")
          .where({ order_id: order.id })
          .innerJoin("item", "item.id", "order_detail.item_id")
          .innerJoin("category", "category.id", "item.category_id")
          .leftJoin("size", "size.id", "item.size_id")

        // Retrieve ratings
        order.items = await Promise.all(order.items.map(async item => {
          const rating = await db("rating")
            .where({ item_id: item.id })
            .avg({ rating: "stars" })
            .first()
          item = { ...item, ...rating }
          return item
        }))

        return order
    }))

    res.status(200).send({
      total,
      items,
    })
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

module.exports = router
