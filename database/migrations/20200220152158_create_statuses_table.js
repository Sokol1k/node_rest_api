exports.up = function(knex) {
  return knex.schema.createTable("statuses", function(table) {
    table.increments();
    table.string("name", 150).notNullable();

    table.unique("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("statuses");
};
