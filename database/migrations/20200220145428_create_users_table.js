exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("email", 255).notNullable();
    table.string("name", 255).notNullable();
    table.integer("role").unsigned().notNullable().references('roles.id');
    table.timestamps();
    table.unique("email");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
