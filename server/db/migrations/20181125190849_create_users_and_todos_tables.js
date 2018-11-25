// migrate latest
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    // id field and primary key constraint
    table.increments()
    table.string("name").notNullable()
    table.string("email").notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })
  .createTable("todos", function(table) {
    // id field and primary key constraint
    table.increments()
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
    table.string("title").notNullable()
    table.boolean("completed").notNullable().defaultTo(false)
    table.integer("user_id").references("id").inTable("users")
  })
};

// rollback migration
exports.down = function(knex, Promise) {
  return knex.schema.dropTable("todos").dropTable("users")
};
