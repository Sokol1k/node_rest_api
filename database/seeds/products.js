const faker = require("faker");

let createRecord = knex => {
  return knex("products").insert({
    name: faker.lorem.words(),
    price: faker.random.number()
  });
};

exports.seed = function(knex) {
  return knex("products")
    .del()
    .then(function() {
      let records = [];
      for (let i = 1; i < 50; i++) {
        records.push(createRecord(knex));
      }
      return Promise.all(records);
    });
};
