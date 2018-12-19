const express = require("express")
const bodyParser = require("body-parser")
const db = require("../db/knex")
const router = express.Router()
const cart = require("./routes/cart")
const admin = require("./routes/admin")
const app = express()
const {
  generateUserToken,
  verifyUserToken,
  findUserCredentials,
  hashPassword,
  authenticate,
  authorizeAdmin,
} = require("./auth")
const {
  convertRating,
  convertGender,
  revertGender,
} = require("./utilities")

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))
router.use(cart)
router.use(admin)
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

  // Send an object with property user for nuxt/auth
  res.send({ user })
})

// Retrieve basic member info
router.get("/member/:id", async (req, res, next) => {
  const { id } = req.params
  let member

  try {
    member = await db.select([
        "firstName",
        "lastName",
        "username",
        "avatar",
      ])
      .from("member")
      .where({ id })
      .first()
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send(member)
})

// Retrieve detailed member info
router.get("/member/detail/:id", authenticate, async (req, res, next) => {
  const { user } = res.locals
  const { id } = req.params
  let member

  // Only deep equality since typeof userId is string
  if (!(user.userId == id))  {
    res.status(401).send()
    return
  }

  try {
    member = await db.select([
        "member.id",
        "member.firstName",
        "member.lastName",
        "member.gender",
        "member.email",
        "member.username",
        "member.birthdate",
        "member.address",
      ])
      .from("member")
      .where({ "member.id": id })
      .first()

    convertGender([member])
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send(member)
})

// Update detailed member info
router.patch("/member/detail", authenticate, async (req, res, next) => {
  const { user } = res.locals
  const { id, ...memberDetails } = req.body
  let result

  if (!id) {
    res.status(400).send()
    return
  }

  // Only deep equality since typeof userId is string
  if (!(user.userId == id))  {
    res.status(401).send()
    return
  }

  revertGender([memberDetails])
  try {
    result = await db("member")
      .where({ id })
      .update(memberDetails)
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send()
})

// TODO: Guard this route
router.delete("/member/:id", /*authenticate,*/ async (req, res, next) => {
  const { id } = req.params
  let result

  try {
    result = await db("member")
      .where({id})
      .del()
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send()
})

router.post("/signup", async (req, res) => {
  let member
  let result

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    role_id
  } = req.body

  try {
    // TODO: Fix validation user input
    if (!firstName || !lastName || !email || !username || !password || !role_id) {
      throw new Error("Incomplete fields.")
    }

    member = {
      firstName,
      lastName,
      email,
      username,
      password: await hashPassword(password),
      role_id,
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
    const token = generateUserToken({ userId, username, role_id })
    res.status(200).send({
      userId,
      username,
      role_id,
      token,
    })
    return
  }

  res.status(500).send()
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
    roleId: user.roleId,
    username,
    token,
  })
})

router.get("/category", (req, res, next) => {
  res.locals.table = "category"
  next()
}, getAll)

/*
router.get("/category/:id", (req, res, next) => {
  res.locals.table = "category"
  next()
}, getId)
*/

router.get("/category/:name", async (req, res, next) => {
  const category = req.params.name
  let results

  try {
    const catObj = await db.select("id")
      .from("category")
      .where({ name: category })
      .first()

    if (!catObj) {
      res.status(404).send("Category not found.")
      return
    }

    const { offset, limit } = req.query
    results = await db.select([
        "item.id",
        "item.sku",
        "item.name",
        "category.name as category",
        "item.description",
        "item.img",
        "item.price",
        "item.discount",
        "size.name as size"
      ])
      .avg("rating.stars as rating")
      .from("item")
      .where({ category_id: catObj.id })
      // Category is required
      .innerJoin("category", "item.category_id", "category.id")
      // Size is not required
      .leftJoin("size", "item.size_id", "size.id")
      .leftJoin("rating", "item.id", "rating.item_id")
      .offset(offset)
      .limit(limit)
      .groupBy(["item.id", "category.name", "size.name"])
      .orderBy("item.id")

    convertRating(results)
  } catch (e) {
    res.status(500).send()
    return
  }

  if (!results) {
    res.status(404).send("No items for category.")
    return
  }

  res.status(200).send(results)
})

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

  const { featured, offset, limit } = req.query
  if (featured) {
    // TODO: retrieve featured items only
    try {
      items = await db.select([
          "item.id",
          "item.sku",
          "item.name",
          "category.name as category",
          "item.description",
          "item.img",
          "item.price",
          "item.discount",
          "size.name as size"
        ])
        .avg("rating.stars as rating")
        .from("item")
        // Category is required
        .innerJoin("category", "item.category_id", "category.id")
        // Size is not required
        .leftJoin("size", "item.size_id", "size.id")
        .leftJoin("rating", "item.id", "rating.item_id")
        .offset(offset)
        .limit(limit)
        .groupBy(["item.id", "category.name", "size.name"])
        .orderBy("item.id")

      convertRating(items)
    } catch (e) {
      res.status(500).send()
      return
    }
  } else {
    try {
      items = await db.select([
          "item.id",
          "item.sku",
          "item.name",
          "category.name as category",
          "item.description",
          "item.img",
          "item.price",
          "item.discount",
          "size.name as size"
        ])
        .avg("rating.stars as rating")
        .from("item")
        // Category is required
        .innerJoin("category", "item.category_id", "category.id")
        // Size is not required
        .leftJoin("size", "item.size_id", "size.id")
        .leftJoin("rating", "item.id", "rating.item_id")
        .offset(offset)
        .limit(limit)
        .groupBy(["item.id", "category.name", "size.name"])
        .orderBy("item.id")

      convertRating(items)
    } catch (e) {
      res.status(500).send()
      return
    }
  }
  res.status(200).send(items)
})

router.get("/item/:sku", async (req, res, next) => {
  const sku = req.params.sku
  let item

  try {
    item = await db.select([
        "item.id",
        "item.sku",
        "item.name",
        "category.name as category",
        "item.description",
        "item.img",
        "item.price",
        "item.discount",
        "size.name as size"
      ])
      .avg("rating.stars as rating")
      .from("item")
      .where({"item.sku": sku})
      // Category is required
      .innerJoin("category", "item.category_id", "category.id")
      // Size is not required
      .leftJoin("size", "item.size_id", "size.id")
      .leftJoin("rating", "item.id", "rating.item_id")
      .first()
      .groupBy(["item.id", "category.name", "size.name"])
      // .orderBy("item.id")
  } catch (e) {
    res.status(500).send()
    return
  }

  if (!item) {
    res.status(404).send("Item not found.")
    return
  }

  res.status(200).send(item)
})

router.get("/order", async (req, res, next) => {
  let orders

  try {
    orders = await db.select([
        "id",
        "member_id",
        "order_at",
        "ship_to",
        "status_id",
        "ship_at",
        "deliver_at",
      ])
      .from("order")
  } catch (e) {
    res.status(500).send()
    return
  }

  res.status(200).send(orders)
})

// Retrieve orders of given member id
router.get("/order/:id", authenticate, async (req, res, next) => {
  const { user } = res.locals
  const { id: member_id } = req.params
  let orders

  if (!(user.userId == member_id)) {
    res.status(401).send()
    return
  }

  try {
    // Retrieve all orders
    orders = await db.select([
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
    orders = await Promise.all(
      orders.map(async order => {
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
  } catch (e) {
  }

  res.status(200).send(orders)
})

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
