const moment = require("moment");

exports.seed = function(knex) {
  return knex("orders")
    .del()
    .then(function() {
      return knex("products")
        .where({ id: 1 })
        .select("*")
        .then(product => {
          let data = {
            product_id: product[0].id
          };
          let hasDiscount = moment().diff(
            moment(product[0].created_at),
            "months"
          );
          if (hasDiscount) {
            data.price =
              product[0].price - (product[0].price * product[0].discount) / 100;
            data.discount = product[0].discount;
          } else {
            data.price = product[0].price;
          }
          return knex("orders").insert(data);
        });
    });
};
