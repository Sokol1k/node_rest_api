exports.up = function(knex) {
  return knex.schema.createTable("products", function(table) {
    table.increments();
    table.string("name", 255).notNullable();
    table.decimal("price", 11, 2).notNullable();
    table.timestamps(true, true);

    table.unique("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
