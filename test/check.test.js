const request = require("supertest");
const createToken = require("./data/token");

const app = require("../app");

createToken("cashier@gamil.com").then(token => {
  it("check.store: Create check", function(done) {
    request(app)
      .post("/api/checks")
      .send({ order_id: 1 })
      .set("Authorization", "bearer " + token)
      .expect(201)
      .end(done);
  });
});
createToken("shop-assistant@gamil.com").then(token => {
  it("check.store: User does not have permission to use this method", function(done) {
    request(app)
      .post("/api/checks")
      .send({ order_id: 1 })
      .set("Authorization", "bearer " + token)
      .expect(403)
      .end(done);
  });
});
createToken("shop-assistant@gamil.com").then(token => {
  it("check.store: User not authorized", function(done) {
    request(app)
      .post("/api/checks")
      .send({ order_id: 1 })
      .expect(403)
      .end(done);
  });
});

createToken("cashier@gamil.com").then(token => {
  it("check.store: Invalid data", function(done) {
    request(app)
      .post("/api/checks")
      .send({ order_id: "A" })
      .set("Authorization", "bearer " + token)
      .expect(422)
      .end(done);
  });
});

createToken("cashier@gamil.com").then(token => {
  it("check.show: Get check", function(done) {
    request(app)
      .get("/api/checks/1")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .end(done);
  });
});

createToken("cashier@gamil.com").then(token => {
  it("check.show: Not data", function(done) {
    request(app)
      .get("/api/checks/100")
      .set("Authorization", "bearer " + token)
      .expect(204)
      .end(done);
  });
});

createToken("shop-assistant@gamil.com").then(token => {
  it("check.show: User does not have permission to use this method", function(done) {
    request(app)
      .get("/api/checks/1")
      .set("Authorization", "bearer " + token)
      .expect(403)
      .end(done);
  });
});

createToken("shop-assistant@gamil.com").then(token => {
  it("check.show: User not authorized", function(done) {
    request(app)
      .get("/api/checks/1")
      .expect(403)
      .end(done);
  });
});
