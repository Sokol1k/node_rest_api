const db = require("../database");
const moment = require("moment");

const index = function(req, res) {
  let orders = db("orders")
    .innerJoin("products", "orders.product_id", "products.id")
    .innerJoin("statuses", "orders.status_id", "statuses.id")
    .select(
      "products.name",
      "statuses.name as status",
      "orders.price",
      "orders.discount",
      "orders.created_at"
    );
  if (req.query.status) {
    orders.where({ status_id: req.query.status });
  }
  if (req.query.from && req.query.to) {
    orders.whereBetween(db.raw("DATE(orders.created_at)"), [
      req.query.from,
      req.query.to
    ]);
  }
  orders
    .then(order => {
      res.send(order);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

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
              res.status(201).send(order[0]);
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

const update = function(req, res) {
  db("orders")
    .where({ id: req.params.id })
    .update({ status_id: req.body.status })
    .then(order => {
      db("orders")
        .select("*")
        .where({ id: req.params.id })
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
};

module.exports = {
  index,
  store,
  update
};
