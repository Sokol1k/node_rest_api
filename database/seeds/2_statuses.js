exports.seed = function(knex) {
  return knex("statuses")
    .del()
    .then(function() {
      return knex("statuses").insert([
        { name: "в ожидании" },
        { name: "выполнено" },
        { name: "оплачено" }
      ]);
    });
};
