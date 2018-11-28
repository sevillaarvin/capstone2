const express = require("express")
const db = require("./knex")

const router = express.Router()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get("")

/*
router.get("/todos", (req, res) => {
  db.select().from("todos").then(data => {
    console.log(data)
    res.send(data)
  })
})

router.get("/todos/insert", (req, res, next) => {
  db.insert(req.body).into("todos").then(data => {
    console.log(data)
    res.send(data)
  }).catch(e => {
    next(e)
  })
})

router.get("/todos/1", (req, res) => {
  db.select().from("todos").where("id", 1).then(data => {
    console.log(data)
    res.send(data)
  })
})

router.get("/todos/raw", (req, res) => {
  db.raw("select * from todos").then(data => {
    console.log(data)
    res.send(data)
  })
})

router.get("/todos/raw/insert", (req, res) => {
  db.raw("insert into todos (title, user_id) values (?, ?)", ["test todo", "2"]).then((data) => {
    console.log(data)
    res.send(data)
  })
})

router.post("/todos/raw", (req, res) => {
  res.send(req.body)
  db.raw("select * from todos").then(data => {
    console.log(data)
  })
})

router.patch("/todos/raw/update/:id", async (req, res) => {
  const field = req.body.field
  const value = req.body.value
  try {
    const response = await db.raw("update todos set " + field + " = ? where id = ?", [value, req.params.id])
    res.status(200).send(response)
  } catch (e) {
    res.status(404).send(e)
  }
})

router.patch("/todos/update/:id", async (req, res, next) => {
  const field = req.body.field
  const value = req.body.value
  try {
    const response = await db("todos").where({id: req.params.id}).update({[field]: value})
    const newTodos = await db.select().from("todos")
    res.status(200).send(newTodos)
  } catch (e) {
    console.log(e)
    next(e)
    // res.status(404).send(e)
  }
})

router.delete("/todos/raw/delete/:id", async (req, res, next) => {
  try {
    await db.raw("delete from todos where id = ?", req.params.id)
    res.status(200).send(await db.select().from("todos"))
  } catch (e) {
    next(e)
  }
})

router.delete("/todos/delete/:id", async (req, res) => {
  try {
    await db("todos").where({id: req.params.id}).del()
    res.status(200).send(await db.select().from("todos"))
  } catch (e) {
    next(e)
  }
})

router.get("/todos/raw/join/:id", async (req, res, next) => {
  try {
    const result = await db.raw("select * from todos inner join users on todos.user_id = users.id where todos.user_id = ?", req.params.id)
    res.status(200).send(result)
  } catch (e) {
    next(e)
  }
})

router.get("/todos/join/:id", async (req, res, next) => {
  try {
    // const result = await db.select().from("todos").innerJoin("users", "todos.user_id", "users.id").where("id", req.params.id)
    const result = await db.select().from("todos").innerJoin("users", "todos.user_id", "users.id").where({"todos.user_id": req.params.id})
    res.status(200).send(result)
  } catch (e) {
    next(e)
  }
})
*/

module.exports = {
  path: "/api",
  handler: router
}
