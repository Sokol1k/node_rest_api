const db = require("../database");

/**
 * Method for creating a check.
 */
const store = function(req, res) {
  // take the data from the database
  db("orders")
    .innerJoin("products", "orders.product_id", "products.id")
    .select("products.name", "orders.price", "orders.created_at")
    .where({ "orders.id": req.body.order_id })
    .then(order => {
      // form the data for sending to the database
      let data = {
        product_name: order[0].name,
        order_price: order[0].price,
        order_created_at: order[0].created_at
      };
      // create a record in the database
      return db("checks").insert(data);
    })
    .then(check => {
      // take the just created record from the database
      return db("checks")
        .where({ id: check })
        .select("*");
    })
    .then(check => {
      // output the created check
      res.status(201).send(check[0]);
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

/**
 * Method for get a check.
 */
const show = function(req, res) {
  // take the data from the database
  db("checks")
    .where({ id: req.params.id })
    .select("*")
    .then(check => {
      // check exists or not?
      if (check.length) {
        // send check to client
        res.send(check[0]);
      } else {
        // send response with status 204
        res.sendStatus(204);
      }
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

module.exports = {
  store,
  show
};
