const db = require("./db/knex")

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

// result2()

async function result3() {
  let start = 0, end = Infinity, step = 1
  let nextIndex = start;
  let iterationCount = 0;
  const rangeIterator = {
     next: async function() {
         let result;
         if (nextIndex <= end) {
             result = { value: nextIndex, done: false }
             nextIndex += step;
             iterationCount++;
             return result;
         }
         return { value: iterationCount, done: true }
     }
  };

  const asdf = await rangeIterator.next()
  console.log(asdf)
}

// result3()

function result4() {
  const abc = [
    {a:1, b:2, c:3},
    {a:2, b:3, c:4},
    {a:3, b:4, c:5},
  ]

  console.log(abc.includes({a:1, b:2, c:3}))
  console.log(abc.some(e => e.a === 4))
}

// result4()

async function result5() {
  const avg = await db.avg("stars").from("rating")
  // console.log(avg)
  let results

  try {
          /*
          "item.sku",
          "item.name",
          "category.name as category",
          "item.description",
          "item.img",
          "item.price",
          "item.discount",
          "size.name as size"
          */
    results = await db.select([
          "item.id",
        ])
        .avg("rating.stars as rating")
        .from("item")
        // Category is required
        .innerJoin("category", "item.category_id", "category.id")
        // Size is not required
        .leftJoin("size", "item.size_id", "size.id")
        .leftJoin("rating", "item.id", "rating.item_id")
        .groupBy(["item.id", "category.name", "size.name"])
        .orderBy("item.id")
        .toString()
  } catch (e) {
    console.log(e)
  }
  console.log(results)
  console.log(Number(null))
  console.log(Number('3.0000'))
}

result5()
