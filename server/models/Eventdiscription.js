const mongoose = require("mongoose");

const eventDiscription = new mongoose.Schema({
  indexId: { type: String, required: true },
  Time: { type: String, required: true },
  eventName: { type: String, required: true },
  eventUrl: { type: String, required: true },
  AddvertiseLink: { type: String, required: true },
  AddvertiseName: { type: String, required: true },
  CurrentNo: { type: String, required: true },
});

const EventDiscription = mongoose.model("EventDiscription", eventDiscription);
module.exports = EventDiscription;
