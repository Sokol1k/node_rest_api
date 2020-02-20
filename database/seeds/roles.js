exports.seed = function(knex) {
  return knex("roles")
    .del()
    .then(function() {
      return knex("roles").insert([
        { name: "shop assistant" },
        { name: "cashier" },
        { name: "accountant" }
      ]);
    });
};
