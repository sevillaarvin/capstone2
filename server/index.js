const express = require('express')
const bodyParser = require("body-parser")
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const db = require("./knex")

app.set('port', port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

app.get("/todos", (req, res) => {
  db.select().from("todos").then(data => {
    console.log(data)
    res.send(data)
  })
})

app.get("/todos/1", (req, res) => {
  db.select().from("todos").where("id", 1).then(data => {
    console.log(data)
    res.send(data)
  })
})

app.get("/todos/raw", (req, res) => {
  db.raw("select * from todos").then(data => {
    console.log(data)
    res.send(data)
  })
})

app.post("/todos/raw", (req, res) => {
  res.send(req.body)
  db.raw("select * from todos").then(data => {
    console.log(data)
  })
})
