// import (with require()) the Express module and instantiate the Express app.
const express = require("express");
const router = new express.Router();
const logger = require("./logger");

router.use(function timeLog(req, res, next) {
  logger.customerLogger.log("info", "Successfully connexion");
  next();
});

router.get("/", function (req, res) {
  res.send("Hello world !");
});

module.exports = router;
