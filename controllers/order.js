const db = require("../database");
const moment = require("moment");

const store = function(req, res) {
  db("products")
    .where({ id: req.body.product_id })
    .select("*")
    .then(product => {
      let data = {
        product_id: product[0].id
      };
      let hasDiscount = moment().diff(moment(product[0].created_at), "months");
      if (hasDiscount) {
        data.price =
          product[0].price - (product[0].price * product[0].discount) / 100;
        data.discount = product[0].discount;
      } else {
        data.price = product[0].price;
      }
      db("orders")
        .insert(data)
        .then(order => {
          db("orders")
            .where({ id: order })
            .select("*")
            .then(order => {
              res.send(order[0]);
            })
            .catch(error => {
              res.status(500).send(error);
            });
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

module.exports = {
  store
};