const faker = require("faker");

let createRecord = knex => {
  return knex("products").insert({
    name: faker.lorem.words(),
    price: faker.random.number(),
    created_at: faker.date.between('2020-01-01', '2020-02-26')
  });
};

exports.seed = function(knex) {
  return knex("products")
    .del()
    .then(function() {
      let records = [];
      for (let i = 0; i < 50; i++) {
        records.push(createRecord(knex));
      }
      return Promise.all(records);
    });
};
