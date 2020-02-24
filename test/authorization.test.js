const request = require("supertest");

const app = require("../app");

it("authorization.login: Successful authorization", function(done) {
  request(app)
    .post("/api/login")
    .send("email=shop-assistant@gamil.com")
    .expect(200)
    .end(done);
});

it("authorization.login: User does not exist", function(done) {
  request(app)
    .post("/api/login")
    .send("email=shop-assistant@gamil.co")
    .expect(400)
    .end(done);
});

it("authorization.login: Invalid data", function(done) {
  request(app)
    .post("/api/login")
    .send("email=shop-assistantgamil.com")
    .expect(422)
    .end(done);
});
