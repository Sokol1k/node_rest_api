const express = require("express");
const router = express.Router();
const checkAuth = require("./authorization/check-auth");
const auth = require("./authorization/authorization");
const orderIndex = require("./order/index");
const orderShow = require("./order/show");
const orderStore = require("./order/store");
const orderUpdate = require("./order/update");
const orderDestroy = require("./order/destroy");
const checkStore = require("./check/store");
const checkShow = require("./check/show");

router.use(checkAuth.middleware);
router.post("/login", auth.rules, auth.middleware);
router.get("/orders", orderIndex.rules, orderIndex.middleware);
router.get("/orders/:id", orderShow.middleware);
router.post("/orders", orderStore.rules, orderStore.middleware);
router.put("/orders/:id", orderUpdate.rules, orderUpdate.middleware);
router.delete("/orders/:id", orderDestroy.middleware);
router.post("/checks", checkStore.rules, checkStore.middleware);
router.get("/checks/:id", checkShow.middleware);

module.exports = router;
