const request = require("supertest");
const createToken = require("./data/token");

const app = require("../app");

it("order.index: Get orders", function(done) {
  request(app)
    .get("/api/orders")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(200)
    .end(done);
});

it("order.index: User does not have permission to use this method", function(done) {
  request(app)
    .get("/api/orders")
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(403)
    .end(done);
});

it("order.index: User not authorized", function(done) {
  request(app)
    .get("/api/orders")
    .expect(403)
    .end(done);
});

it("order.index: Invalid params", function(done) {
  request(app)
    .get("/api/orders")
    .send({ status: "a" })
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(422)
    .end(done);
});

it("order.show: Show order", function(done) {
  request(app)
    .get("/api/orders/1")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(200)
    .end(done);
});

it("order.show: Not data", function(done) {
  request(app)
    .get("/api/orders/100")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(204)
    .end(done);
});

it("order.show: User does not have permission to use this method", function(done) {
  request(app)
    .get("/api/orders/1")
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(403)
    .end(done);
});

it("order.show: User not authorized", function(done) {
  request(app)
    .get("/api/orders/1")
    .expect(403)
    .end(done);
});

it("order.store: Create orders", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: 1 })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(201)
    .end(done);
});

it("order.store: User does not have permission to use this method", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: 1 })
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(403)
    .end(done);
});

it("order.store: User not authorized", function(done) {
  request(app)
    .post("/api/orders")
    .expect(403)
    .end(done);
});

it("order.store: Invalid params", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: "a" })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(422)
    .end(done);
});

it("order.update: Update orders", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 1 })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(200)
    .end(done);
});

it("order.update: Not date", function(done) {
  request(app)
    .put("/api/orders/100")
    .send({ status: 1 })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(204)
    .end(done);
});

it("order.update: User does not have permission to use this method", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 1 })
    .set("Authorization", "bearer " + createToken("accountant@gamil.com"))
    .expect(403)
    .end(done);
});

it("order.update: User not authorized", function(done) {
  request(app)
    .put("/api/orders/1")
    .expect(403)
    .end(done);
});

it("order.update: Invalid params", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 0 })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(422)
    .end(done);
});

it("order.destroy: Destroy order", function(done) {
  request(app)
    .delete("/api/orders/1")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(200)
    .end(done);
});

it("order.destroy: Not data", function(done) {
  request(app)
    .delete("/api/orders/100")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(204)
    .end(done);
});

it("order.destroy: User does not have permission to use this method", function(done) {
  request(app)
    .delete("/api/orders/1")
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(403)
    .end(done);
});

it("order.destroy: User not authorized", function(done) {
  request(app)
    .delete("/api/orders/1")
    .expect(403)
    .end(done);
});
