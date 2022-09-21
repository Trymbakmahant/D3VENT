const router = require("express").Router();

const EventDiscription = require("../models/Eventdiscription");
router.route("/").post(async (req, res) => {
  try {
    const {
      indexId,
      Time,
      eventName,
      eventUrl,
      AddvertiseLink,
      AddvertiseName,
      CurrentNo,
    } = req.body;

    const eventDiscription = new EventDiscription({
      indexId,
      Time,
      eventName,
      eventUrl,
      AddvertiseLink,
      AddvertiseName,
      CurrentNo,
    });

    await eventDiscription.save();

    res.send({ message: "sucsses" });
  } catch (err) {
    console.log(err);
    res.json("mission failed");
  }
});

module.exports = router;
