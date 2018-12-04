const db = require("./knex")

async function result1() {
  let result = await db.select().from("item")
  // console.log(result)

  result = await db.select([
      "item.id",
      "category.name as category",
      "size.name as size",
    ])
    .from("item")
    .innerJoin("category", "item.category_id", "category.id")
    .leftJoin("size", "item.size_id", "size.id")
  console.log(result)
}

// result1()

async function result2() {
  let result = await db.select()
    .from("item")
    .limit(1)
    .offset(null)

  console.log(result)
}

result2()
