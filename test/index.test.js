const { resolve } = require("path")
const { Nuxt, Builder } = require("nuxt")
// const express = require("express")
const request = require("supertest")
const expect = require("chai").expect
const db = require("../db/knex")

let nuxt = null
// const app = express()
const port = 3999
const host = "127.0.0.1"

/*
before(async function () {
  this.timeout(60000)

  // Build temporary Nuxt server
  const config = {
    dev: false,
    rootDir: resolve(__dirname, "..")
  }

  nuxt = new Nuxt(config)

  await new Builder(nuxt).build().catch(e => {
    console.error(e.message)
    console.error(e.detail)
  })
  await nuxt.server.listen(port, host).catch(e => {
    console.error(e.message)
    console.error(e.detail)
  })
})

describe("test", () => {
  it("should test", () => {
    
  })
})

after(() => {
  nuxt.close()
})
*/
