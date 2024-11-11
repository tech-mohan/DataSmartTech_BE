const express = require("express");
const services = require("D:/DST/data_smart_tech_BE/JSON files/services_data.json");
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

app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});
