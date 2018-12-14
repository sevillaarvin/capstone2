const db = require("./db/knex")
const uuidv4 = require("uuid/v4")

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
  } catch (e) {
    console.log(e)
  }
  console.log(typeof results[0].rating)
  console.log(Number(null))
  console.log(Number('3.0000'))
}

// result5()

async function result6() {
  const members = db.select([
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
  console.log(members)
}

// result6()

async function result7() {
  const cart = await db.select([
      "id",
      "member_id",
      "order_id",
    ])
    .from("cart")
    .where({
      member_id: 3,
      order_id: null,
    })
    .first()

  console.log(cart)

  const items = await db.select([
    ])
    .from("cart_item")
    .where({
      cart_id: cart.id
    })

  console.log(items)

  const joined = await db.select([
      "cart_item.id as id",
      "cart_item.cart_id",
      "cart_item.item_id",
      "cart_item.quantity",
      "item.sku",
      "item.name",
      "item.category_id",
      "item.description",
      "item.img",
      "item.price",
      "item.discount",
      "item.size_id",
    ])
    .from("cart_item")
    .where({
      cart_id: cart.id
    })
    .innerJoin("item", "item.id", "cart_item.item_id")
    // PREVIOUSLY IMPLEMENTED
    .avg("rating.stars as rating")
    // Category is required
    .innerJoin("category", "item.category_id", "category.id")
    // Size is not required
    .leftJoin("size", "item.size_id", "size.id")
    .leftJoin("rating", "item.id", "rating.item_id")
    .groupBy(["cart_item.id", "item.id", "category.name", "size.name"])
    .orderBy("cart_item.id")

  console.log(joined)
}

// result7()

async function result8() {
  const member_id = 2
  let orders
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

  try {
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
    console.log(e)
  }

  /*
  try {
    orders = await Promise.all(orders.map(async order => {
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
    console.log(e)
  }
  */

  console.log(JSON.stringify(orders, null, 2))
}

//result8()

for (let i = 0; i < 1000; ++i) {
  console.log(uuidv4() + "-" + i)
}

