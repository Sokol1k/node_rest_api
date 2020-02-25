const db = require("../database");

const store = function(req, res) {
  db("orders")
    .innerJoin("products", "orders.product_id", "products.id")
    .select("products.name", "orders.price", "orders.created_at")
    .where({ "orders.id": req.body.order_id })
    .then(order => {
      let data = {
        product_name: order[0].name,
        order_price: order[0].price,
        order_created_at: order[0].created_at
      };
      return db("checks").insert(data);
    })
    .then(check => {
      return db("checks")
        .where({ id: check })
        .select("*");
    })
    .then(check => {
      res.status(201).send(check[0]);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

const show = function(req, res) {
  db("checks")
    .where({ id: req.params.id })
    .select("*")
    .then(check => {
      if (check.length) {
        res.send(check[0]);
      } else {
        res.status(204).send(check[0]);
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

module.exports = {
  store,
  show
};
