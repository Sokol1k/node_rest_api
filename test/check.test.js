const request = require("supertest");
const createToken = require("./data/token");

const app = require("../app");

it("check.store: Create check", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(201)
    .end(done);
});

it("check.store: User does not have permission to use this method", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(403)
    .end(done);
});

it("check.store: User not authorized", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .expect(403)
    .end(done);
});

it("check.store: Invalid data", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: "A" })
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(422)
    .end(done);
});

it("check.show: Get check", function(done) {
  request(app)
    .get("/api/checks/1")
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(200)
    .end(done);
});

it("check.show: Not data", function(done) {
  request(app)
    .get("/api/checks/100")
    .set("Authorization", "bearer " + createToken("cashier@gamil.com"))
    .expect(204)
    .end(done);
});

it("check.show: User does not have permission to use this method", function(done) {
  request(app)
    .get("/api/checks/1")
    .set("Authorization", "bearer " + createToken("shop-assistant@gamil.com"))
    .expect(403)
    .end(done);
});

it("check.show: User not authorized", function(done) {
  request(app)
    .get("/api/checks/1")
    .expect(403)
    .end(done);
});
