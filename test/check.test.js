const request = require("supertest");

const app = require("../app");

it("check.store: Create check", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .set("Cookie", ["user=2", "role=2"])
    .expect(201)
    .end(done);
});

it("check.store: User does not have permission to use this method", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .set("Cookie", ["role=2"])
    .expect(401)
    .end(done);
});

it("check.store: User not authorized", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: 1 })
    .set("Cookie", ["user=2"])
    .expect(401)
    .end(done);
});

it("check.store: Invalid data", function(done) {
  request(app)
    .post("/api/checks")
    .send({ order_id: "A" })
    .set("Cookie", ["user=2", "role=2"])
    .expect(422)
    .end(done);
});

it("check.show: Get check", function(done) {
  request(app)
    .get("/api/checks/1")
    .set("Cookie", ["user=2", "role=2"])
    .expect(200)
    .end(done);
});

it("check.show: Not data", function(done) {
  request(app)
    .get("/api/checks/100")
    .set("Cookie", ["user=2", "role=2"])
    .expect(204)
    .end(done);
});

it("check.show: User does not have permission to use this method", function(done) {
  request(app)
    .get("/api/checks/1")
    .set("Cookie", ["user=2", "role=1"])
    .expect(401)
    .end(done);
});

it("check.show: User not authorized", function(done) {
  request(app)
    .get("/api/checks/1")
    .set("Cookie", ["role=2"])
    .expect(401)
    .end(done);
});