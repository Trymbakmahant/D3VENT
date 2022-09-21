require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const EventDiscription = require("./routes/EventDiscription");
connection();

// middlewares
app.use(express.json());
app.use(cors());

app.use("api/EventDiscription ", EventDiscription);

const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
