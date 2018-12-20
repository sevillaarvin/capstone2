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
  const { id, ...member } = req.body
  let result

  try {
    result = await db("member")
      .where({ id })
      .update(member)
  } catch (e) {
    res.status(500).send()
    return
  }

  if (!result) {
    res.status(404).send()
    return
  }

  res.status(200).send()
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
  const { id } = req.params
  const itemDetails = req.body

  try {
    await db("item")
      .where({ id })
      .update(itemDetails)

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

module.exports = router
