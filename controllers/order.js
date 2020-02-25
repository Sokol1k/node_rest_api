const db = require("../database");
const moment = require("moment");

/**
 * Method for get a list of orders.
 */
const index = function(req, res) {
  // take the data from the database
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
  // is the status indicated?
  if (req.query.status) {
    orders.where({ status_id: req.query.status });
  }
  // is the date from and to indicated?
  if (req.query.from && req.query.to) {
    orders.whereBetween(db.raw("DATE(orders.created_at)"), [
      req.query.from,
      req.query.to
    ]);
  }
  orders
    .then(order => {
      // send a list of all orders
      res.send(order);
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

/**
 * Method for get the order.
 */
const show = function(req, res) {
  // take the data from the database
  db("orders")
    .where({ id: req.params.id })
    .select("*")
    .then(order => {
      // order exists or not?
      if (order.length) {
        // send order to client
        res.send(order[0]);
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

/**
 * Method for creating a order.
 */
const store = function(req, res) {
  // take the data from the database
  db("products")
    .where({ id: req.body.product_id })
    .select("*")
    .then(product => {
      // form the data for sending to the database
      let data = {
        product_id: product[0].id
      };
      // number of months after product creation
      let hasDiscount = moment().diff(moment(product[0].created_at), "months");
      // one month or more?
      if (hasDiscount) {
        // change the price in accordance with the discount
        data.price =
          product[0].price - (product[0].price * product[0].discount) / 100;
        // write down the percentage discount
        data.discount = product[0].discount;
      } else {
        // price without discount
        data.price = product[0].price;
      }
      // create a record in the database
      return db("orders").insert(data);
    })
    .then(order => {
      // take the just created record from the database
      return db("orders")
        .where({ id: order })
        .select("*");
    })
    .then(order => {
      // output the created order
      res.status(201).send(order[0]);
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

/**
 * Method for updating an order.
 */
const update = function(req, res) {
  // update the data in the database
  db("orders")
    .where({ id: req.params.id })
    .update({ status_id: req.body.status })
    .then(order => {
      // order exists or not?
      if (order) {
        // take the just updated record from the database
        return db("orders")
          .select("*")
          .where({ id: order });
      } else {
        return order;
      }
    })
    .then(order => {
      // output the updated order or status 204
      order ? res.send(order[0]) : res.sendStatus(204);
    })
    .catch(error => {
      // send an error message
      res.status(500).send(error);
    });
};

/**
 * Method for deleting an order.
 */
const destroy = function(req, res) {
  // delete data from the database
  db("orders")
    .where({ id: req.params.id })
    .delete()
    .then(order => {
      // order exists or not?
      if (order) {
        // send a message about the successful deletion of data
        res.send({ message: "Order has been deleted." });
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
  index,
  show,
  store,
  update,
  destroy
};
