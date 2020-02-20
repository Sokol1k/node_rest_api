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
    table.specificType("status", "tinyint").notNullable().defaultTo(0);
    table.decimal("price", 11, 2).notNullable();
    table.float("discount").nullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("orders");
};
