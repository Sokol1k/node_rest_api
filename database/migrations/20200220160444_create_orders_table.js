exports.up = function(knex) {
  return knex.schema.createTable("orders", function(table) {
    table.increments();
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("products.id")
      .onDelete('cascade')
      .onUpdate('cascade');
    table.string("status").notNullable().defaultTo("в ожидании");
    table.decimal("price", 11, 2).notNullable();
    table.float("discount").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("orders");
};
