const express = require("express")
const bodyParser = require("body-parser")
const db = require("../db/knex")

const router = express.Router()
const app = express()
const bcrypt = require("bcryptjs")
const {
  generateUserToken,
  verifyUserToken,
  findUserCredentials
} = require("./auth")
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

const authenticate = async (req, res, next) => {
  let token

  if (req.body && req.body.token) {
    token = req.body.token
  }
  const user = await verifyUserToken(token)
    .catch(e => {
    res.status(401).send()
  })
  res.locals.user = user
  next()
}

router.get("/member/:id", (req, res, next) => {
  res.locals.table = "member"
  next()
}, getId)

// TODO: Fix this faux-route
router.get("/user", async (req, res) => {
  let token
  let user
  try {
    token = req.get("authorization")
      .split(" ")[1]
    user = await verifyUserToken(token)
  } catch (e) {
    res.status(401).send("Invalid token.")
    return
  }

  res.send({ user })
})

router.post("/signup", async (req, res) => {
  let member
  let result

  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password
    } = req.body

    // TODO: Fix validation user input
    if (!firstName || !lastName || !email || !username || !password) {
      throw new Error("Incomplete fields.")
    }

    member = {
      firstName,
      lastName,
      email,
      username,
      password: await bcrypt.hash(password, 10)
    }
  } catch (e) {
    res.status(400).send()
    return
  }

  try {
    result = await db.insert(member, "id").into("member")
  } catch (e) {
    res.status(500).send()
    return
  }

  if (result) {
    const userId = result[0]
    const token = generateUserToken({ userId })
    res.status(200).send({
      userId,
      token
    })
    return
  }

  return res.status(500).send()
})

router.post("/signin", async (req, res) => {
  let user
  const { username, password } = req.body
  // TODO: Fix validation
  if (!username || !password) {
    res.status(400).send("A valid username and password is required.")
    return
  }

  try {
    user = await findUserCredentials(username, password)
  } catch (e) {
    res.status(404).send("Invalid username or password.")
    return
  }

  const token = generateUserToken(user)
  res.status(200).send({
    userId: user.userId,
    token
  })
  res.status(200).send()
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
