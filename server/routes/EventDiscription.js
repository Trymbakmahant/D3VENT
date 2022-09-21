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
    } = req.body;

    const eventDiscription = new EventDiscription({
      indexId: indexId,
      Time: Time,
      eventName: eventName,
      eventUrl: eventUrl,
      AddvertiseLink: AddvertiseLink,
      AddvertiseName: AddvertiseName,
    });

    await eventDiscription.save();
    console.log(eventDiscription);
  } catch (err) {
    cosnole.log(err);
  }
});

module.exports = router;
