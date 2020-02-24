const request = require("supertest");

const app = require("../app");

it("order.index: Get orders", function(done) {
  request(app)
    .get("/api/orders")
    .set("Cookie", ["user=1", "role=1"])
    .expect(200)
    .end(done);
});

it("order.index: User does not have permission to use this method", function(done) {
  request(app)
    .get("/api/orders")
    .set("Cookie", ["user=2", "role=2"])
    .expect(401)
    .end(done);
});

it("order.index: User not authorized", function(done) {
  request(app)
    .get("/api/orders")
    .set("Cookie", ["role=2"])
    .expect(401)
    .end(done);
});

it("order.index: Invalid params", function(done) {
  request(app)
    .get("/api/orders")
    .send({ status: "a" })
    .set("Cookie", ["user=2", "role=2"])
    .expect(422)
    .end(done);
});

it("order.store: Create orders", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: 1 })
    .set("Cookie", ["user=2", "role=2"])
    .expect(201)
    .end(done);
});

it("order.store: User does not have permission to use this method", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: 1 })
    .set("Cookie", ["user=1", "role=1"])
    .expect(401)
    .end(done);
});

it("order.store: User not authorized", function(done) {
  request(app)
    .post("/api/orders")
    .set("Cookie", ["role=2"])
    .expect(401)
    .end(done);
});

it("order.store: Invalid params", function(done) {
  request(app)
    .post("/api/orders")
    .send({ product_id: "a" })
    .set("Cookie", ["user=2", "role=2"])
    .expect(422)
    .end(done);
});

it("order.update: Update orders", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 1 })
    .set("Cookie", ["user=2", "role=2"])
    .expect(200)
    .end(done);
});

it("order.update: Update orders", function(done) {
  request(app)
    .put("/api/orders/100")
    .send({ status: 1 })
    .set("Cookie", ["user=2", "role=2"])
    .expect(204)
    .end(done);
});

it("order.update: User does not have permission to use this method", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 1 })
    .set("Cookie", ["user=3", "role=3"])
    .expect(401)
    .end(done);
});

it("order.update: User not authorized", function(done) {
  request(app)
    .put("/api/orders/1")
    .set("Cookie", ["role=2"])
    .expect(401)
    .end(done);
});

it("order.update: Invalid params", function(done) {
  request(app)
    .put("/api/orders/1")
    .send({ status: 0 })
    .set("Cookie", ["user=2", "role=2"])
    .expect(422)
    .end(done);
});
