exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        { name: "Vasya", email: "shop-assistant@gamil.com", role_id: 1 },
        { name: "Petya", email: "cashier@gamil.com", role_id: 2 },
        { name: "Vova", email: "accountant@gamil.com", role_id: 3 }
      ]);
    });
};
