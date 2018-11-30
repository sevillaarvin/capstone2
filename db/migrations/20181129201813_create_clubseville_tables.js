const database = "clubseville"

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("member", table => {
      table.increments()
      table.text("firstName").notNullable()
      table.text("lastName").notNullable()
      table.text("email").notNullable().unique()
      table.text("username").notNullable().unique()
      table.text("password").notNullable()
    })
    .createTable("category", table => {
      table.increments()
      table.text("name").notNullable()
    })
    .createTable("item", table => {
      table.increments()
      table.text("name").notNullable()
      table.integer("category_id").notNullable()
      table.foreign("category_id").references("id").inTable("category")
      table.text("description").notNullable()
      table.text("img")
      // integer - store money in cents
      table.integer("price").notNullable()
    })
    .createTable("rating", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.integer("rating").notNullable().unsigned()
    })
    /*
    .createTable("", table => {
      table.increments()
    })
    */
    .then(() => {
      knex.raw("alter table rating add check (rating between 1 and 5)").then(() => {})
    })
    .catch(e => {
      console.log(e)
      return knex.schema
        .dropTableIfExists("rating")
        .dropTableIfExists("item")
        .dropTableIfExists("category")
        .dropTableIfExists("member")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("rating")
    .dropTableIfExists("item")
    .dropTableIfExists("category")
    .dropTableIfExists("member")
};

exports.config = { transaction: false }
