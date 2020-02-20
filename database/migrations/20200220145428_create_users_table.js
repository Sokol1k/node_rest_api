exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("email", 255).notNullable();
    table.string("name", 255).notNullable();
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("roles.id")
      .onDelete()
      .onUpdate();
    table.timestamps();

    table.unique("email");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
