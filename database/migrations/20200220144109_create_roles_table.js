exports.up = function(knex) {
  return knex.schema.createTable("roles", function(table) {
    table.increments();
    table.string('name', 50).notNullable();
    table.unique('name');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles')
};
