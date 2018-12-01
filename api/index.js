const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const db = require("../db/knex")

const router = express.Router()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
app.use(router)

const getId = async (req, res) => {
  let result

  try {
    result = await db.select(/* which columns? */)
      .from(res.locals.table)
      .where({id: req.params.id})
      .first()
  } catch (e) {
    res.status(404).send()
  }

  if (!result) {
    res.status(404).send()
  }

  res.status(200).send(result)
}

const getAll = async (req, res) => {
  let results

  try {
    results = await db.select()
      .from(res.locals.table)
  } catch (e) {
    res.status(500).send()
  }
  res.status(200).send(results)
}

router.get("/member/:id", (req, res, next) => {
  res.locals.table = "member"
  next()
}, getId)

router.post("/member", async (req, res) => {
  let result

  try {
    const member = req.body
    member.password = await bcrypt.hash(member.password, 10)
    result = await db.insert(member, "id").into("member")
  } catch (e) {
    res.status(500).send()
  }
  res.status(200).send(result)
})

router.get("/category", (req, res, next) => {
  res.locals.table = "category"
  next()
}, getAll)

router.get("/category/:id", (req, res, next) => {
  res.locals.table = "category"
  next()
}, getId)

router.get("/size", (req, res, next) => {
  res.locals.table = "size"
  next()
}, getAll)

router.get("/size/:id", (req, res, next) => {
  res.locals.table = "size"
  next()
}, getId)

router.get("/item", async (req, res, next) => {
  let items

  if (req.query && req.query.hasOwnProperty("featured")) {
    // TODO: retrieve featured items only
    try {
      items = await db.select().from("item")
      res.status(200).send(items)
    } catch (e) {
      res.status(500).send()
    }
  } else {
    res.locals.table = "item"
    next()
  }
}, getAll)

router.get("/item/:id", (req, res, next) => {
  res.locals.table = "item"
  next()
}, getId)

router.get("/order/:id", async (req, res, next) => {
  res.locals.table = "order"
  next()
}, getId)

router.get("/order_detail", async (req, res, next) => {
  if (req.query && req.query.orderId) {
    let order_details

    try {
      order_details = await db.select()
        .from("order_detail")
        .where({order_id: req.query.orderId})
    } catch (e) {
      res.status(404).send()
    }

    if (!order_details) {
      res.status(404).send()
    }

    res.status(200).send(order_details)
  } else {
    res.status(400).send()
  }
}, getId)

router.get("/order_detail/:id", async (req, res, next) => {
  res.locals.table = "order_detail"
  next()
}, getId)

module.exports = {
  path: "/api",
  handler: router,
  app
}
