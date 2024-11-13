const express = require("express");
const services = require("D:/DST/data_smart_tech_BE/JSON files/services_data.json");
const Teams = require("./JSON files/Teams/Teams.json");
const Testimonials = require("./JSON files/Testimonials.json");
const routes = express.Router();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type",
    "Authorization"
  );
  next();
});

app.use("/Services", (req, res) => {
  res.send(services);
});
app.use("/Teams", (req, res) => {
  res.send(Teams);
});
app.use("/Testimonials", (req, res) => {
  res.send(Testimonials);
});

app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});
