const express = require("express")
const router = express.Router()
const {
  hashPassword,
  authenticate,
  authorizeAdmin
} = require("../auth")
const db = require("../../db/knex")
const {
  convertGender,
} = require("../utilities")

router.get("/role", authenticate, authorizeAdmin, async (req, res, next) => {
  let roles
  try {
    roles = await db.select([
        "id",
        "name",
      ])
      .from("role")
  } catch (e) {
    res.status(500).send()
  }

  if (!roles) {
    res.status(400).send()
  }

  res.status(200).send(roles)
})

router.get("/member", authenticate, authorizeAdmin, async (req, res, next) => {
  let members

  try {
    members = await db.select([
        "member.id",
        "member.firstName",
        "member.lastName",
        "member.gender",
        "member.email",
        "member.username",
        "member.birthdate",
        "member.address",
        "member.created_at",
        "role.name as role",
      ])
      .from("member")
      .innerJoin("role", "member.role_id", "role.id")

    convertGender(members)
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send(members)
})

router.post("/member", authenticate, authorizeAdmin, async (req, res, next) => {
  const member = req.body
  try {
    // TODO: Fix random password
    member.password = await hashPassword("a")
    result = await db.insert(member, "id")
      .into("member")
  } catch (e) {
    res.status(500).send()
  }

  res.status(200).send(result)
})

router.patch("/member", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const { id, role, ...member } = req.body
    let role_id

    if (role) {
      const roleObj = await db.select("id")
        .from("role")
        .where({ name: role })
        .first()
      role_id = roleObj.id
    }

    const result = await db("member")
      .where({ id })
      .update({
        role_id,
        ...member,
      })

    if (!result) {
      res.status(404).send()
      return
    }

    res.status(204).send()
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.post("/item", authenticate, authorizeAdmin, async (req, res) => {
  const { category, size, ...item } = req.body
  let size_id

  try {
    const { id: category_id } = await db.select("id")
      .from("category")
      .where({ name: category })
      .first()

    if (size) {
      ({ id: size_id } = await db.select("id")
        .from("size")
        .where({ name: size })
        .first())
    }

    await db.insert({
        ...item,
        category_id,
        size_id,
      })
      .into("item")
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(201).send()
})

router.patch("/item/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { category, size, ...itemDetails } = req.body
    let category_id
    let size_id

    if (category) {
      const { id } = await db.select("id")
        .from("category")
        .where({ name: category })
        .first()
      category_id = id
    }

    if (size) {
      const sizeObj = await db.select("id")
        .from("size")
        .where({ name: size })
        .first()
      if (sizeObj) {
        size_id = sizeObj.id
      } else {
        size_id = null
      }
    }

    await db("item")
      .where({ id })
      .update({
        category_id,
        size_id,
        ...itemDetails,
      })

    res.status(204).send()
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.delete("/item/:id", authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params

  try {
    await db("item")
      .where({ id })
      .del()
    res.status(204).send()
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.get("/status", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const statuses = await db.select([
      "id",
      "name"
    ]).from("status")
    
    res.status(200).send(statuses)
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.get("/order", authenticate, authorizeAdmin, async (req, res, next) => {
  try {
    const { offset, limit, orderBy, descending } = req.query
    const { count } = await db("order")
      .count("id")
      .first()
    const total = Number(count)

    const orders = await db.select([
        "order.id",
        "order.member_id as memberId",
        "order.order_at as orderAt",
        "order.ship_to as shipTo",
        "status.name as status",
        "order.ship_at as shipAt",
        "order.deliver_at as deliverAt",
        "ship_method.name as shipMethod",
        "pay_method.name as payMethod",
        "order.paypal_payment_sid as paypalPaymentSid",
      ])
      .from("order")
      .innerJoin("status", "status.id", "order.status_id")
      .leftJoin("ship_method", "ship_method.id", "order.ship_method_id")
      .leftJoin("pay_method", "pay_method.id", "order.pay_method_id")
      .offset(offset)
      .limit(limit)
      .orderBy(orderBy || "order.id", descending === "true" ? "desc" : "asc")

    res.status(200).send({
      total,
      items: orders,
    })
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.patch("/order/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const {
      memberId: member_id,
      orderAt: order_at,
      shipTo: ship_to,
      status,
      shipAt: ship_at,
      deliverAt: deliver_at,
      shipMethod,
      payMethod,
      paypalPaymentSid: paypal_payment_sid,
    } = req.body
    let status_id
    let ship_method_id
    let pay_method_id

    if (status) {
      const { id } = await db.select("id")
        .from("status")
        .where({ name: status })
        .first()
      status_id = id
    }

    if (shipMethod) {
      const { id } = await db.select("id")
        .from("ship_method")
        .where({ name: shipMethod })
        .first()
      ship_method_id = id
    }

    if (payMethod) {
      const { id } = await db.select("id")
        .from("pay_method")
        .where({ name: payMethod })
        .first()
      pay_method_id = id
    }

    await db("order")
      .where({ id })
      .update({
        member_id,
        order_at,
        ship_to,
        status_id,
        ship_at,
        deliver_at,
        ship_method_id,
        pay_method_id,
        paypal_payment_sid,
      })

    res.status(204).send()
    return
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
