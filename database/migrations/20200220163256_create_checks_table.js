exports.up = function(knex) {
  return knex.schema.createTable("checks", function(table) {
    table.increments();
    table.string("product_name", 255).notNullable();
    table.decimal("product_price", 11, 2).notNullable();
    table.timestamp("order_created_at").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("checks");
};
