exports.up = function(knex) {
  return knex.schema.createTable("orders", function(table) {
    table.increments();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("products.id")
      .onDelete("cascade")
      .onUpdate("cascade");
    table
      .integer("status_id")
      .unsigned()
      .notNullable()
      .defaultTo(1)
      .references("statuses.id")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.decimal("price", 11, 2).notNullable();
    table.float("discount").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("orders");
};
