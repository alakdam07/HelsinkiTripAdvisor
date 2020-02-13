const { Router } = require("express");
const router = Router();
const logEntry = require("../models/travelModels");

router.get("/", async (req, res, next) => {
  try {
    const entries = await logEntry.find();
    res.json({
      entries
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logs = new logEntry(req.body);
    const entry = await logs.save();
    res.json(entry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
