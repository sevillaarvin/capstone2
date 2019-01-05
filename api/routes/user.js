const express = require("express")
const router = express.Router()
const db = require("../../db/knex")
const {
  authenticate,
  verifyUserToken,
  findUserCredentials,
  hashPassword,
} = require("../auth")
const {
  revertGender,
} = require("../utilities")

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

// Update detailed member info
router.patch("/:userId", authenticate, async (req, res, next) => {
  try {
    const { user: { userId, username } } = res.locals
    const { userId: unverifiedId } = req.params
    const {
      password,
      newPassword,
      confirmPassword,
      ...memberDetails
    } = req.body

    // Only deep equality since typeof userId is string
    if (!(userId == unverifiedId))  {
      res.status(401).send()
      return
    }

    revertGender([memberDetails])

    // Verify current password to change to new password
    if (password || newPassword || confirmPassword) {
      try {
        try {
          await findUserCredentials(username, password)
        }
        catch(e) {
          // Revise error message
          await Promise.reject("Invalid current password")
        }

        if (newPassword && confirmPassword) {
          if (newPassword !== confirmPassword) {
            await Promise.reject("New password does not match")
          } else {
            memberDetails.password = await hashPassword(newPassword)
          }
        } else {
          await Promise.reject("New password does not match")
        }
      } catch (e) {
        res.status(409).send(e)
        return
      }
    }

    const result = await db("member")
      .where({ id: unverifiedId })
      .update(memberDetails)

    // Send 404 if nonexistent
    if (!result) {
      res.status(404).send()
      return
    }

    res.status(200).send()
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

module.exports = router
