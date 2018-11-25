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

router.get("/todos", (req, res) => {
  db.select().from("todos").then(data => {
    console.log(data)
    res.send(data)
  })
})

router.get("/todos/insert", (req, res) => {
  db("todos").insert({
    title: "elegant todo",
    user_id: 3
  }).then(data => {
    console.log(data)
    res.send(data)
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

module.exports = {
  path: "/",
  handler: router
}
