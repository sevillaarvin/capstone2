const database = "clubseville"

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("role", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("member", table => {
      table.increments()
      table.text("firstName").notNullable()
      table.text("lastName").notNullable()
      table.enu("gender", ["m", "f"])
      table.text("email").notNullable().unique()
      table.text("username").notNullable().unique()
      table.text("password").notNullable()
      table.date("birthdate")
      table.text("address")
      table.timestamp("created_at").notNullable()
        .defaultTo(knex.fn.now())
      table.integer("role_id").notNullable()
      table.foreign("role_id").references("id").inTable("role")
      table.text("avatar")
      table.boolean("deactivated").notNullable()
        .defaultTo(false)
    })

    .createTable("category", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("size", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("item", table => {
      table.increments()
      table.text("sku").notNullable().unique()
      table.text("name").notNullable()
      table.integer("category_id").notNullable()
      table.foreign("category_id").references("id").inTable("category")
      table.text("description").notNullable()
      table.text("img")
      table.decimal("price", 15, 6).notNullable()
      table.decimal("discount", 15, 6).defaultTo(0)
      table.integer("size_id")
      table.foreign("size_id").references("id").inTable("size")
    })
    
    .createTable("rating", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.unique(["member_id", "item_id"])
      table.integer("stars").notNullable().unsigned()
      table.text("comment")
    })

    .createTable("status", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("ship_method", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("pay_method", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("order", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.timestamp("order_at").notNullable().defaultTo(knex.fn.now())
      table.text("ship_to").notNullable()
      table.integer("status_id").notNullable().defaultTo(1)
      table.foreign("status_id").references("id").inTable("status")
      table.timestamp("ship_at")
      table.timestamp("deliver_at")
      table.integer("ship_method_id")
      table.foreign("ship_method_id").references("id").inTable("ship_method")
      table.integer("pay_method_id")
      table.foreign("pay_method_id").references("id").inTable("pay_method")
      table.text("paypal_payment_sid").unique()
    })

    .createTable("order_detail", table => {
      table.increments()
      table.integer("order_id").notNullable()
      table.foreign("order_id").references("id").inTable("order")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.integer("quantity").notNullable()
      table.decimal("price", 15, 6).notNullable()
      table.decimal("discount", 15, 6).defaultTo(0)
    })

    .createTable("cart", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.integer("order_id").unique()
      table.foreign("order_id").references("id").inTable("order")
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
    })
    
    .createTable("cart_item", table => {
      table.increments()
      table.integer("cart_id").notNullable()
      table.foreign("cart_id").references("id").inTable("cart")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.unique(["cart_id", "item_id"])
      table.integer("quantity").notNullable()
    })

    /*
    .createTable("", table => {
      table.increments()
    })
    */
    .then(() => {
      knex.raw("alter table rating add check (stars between 1 and 5)").then(() => {})
      knex.raw("alter table order_detail add check (quantity > 0)").then(() => {})
      knex.raw("alter table cart_item add check (quantity > 0)").then(() => {})
    })
    .catch(e => {
      console.log(e)
      return dropTables(knex, Promise)
    })
};

exports.down = function(knex, Promise) {
  return dropTables(knex, Promise)
};

const dropTables = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists("cart_item")
    .dropTableIfExists("cart")
    .dropTableIfExists("order_detail")
    .dropTableIfExists("order")
    .dropTableIfExists("pay_method")
    .dropTableIfExists("ship_method")
    .dropTableIfExists("status")
    .dropTableIfExists("rating")
    .dropTableIfExists("item")
    .dropTableIfExists("size")
    .dropTableIfExists("category")
    .dropTableIfExists("member")
    .dropTableIfExists("role")
}

exports.config = { transaction: false }
