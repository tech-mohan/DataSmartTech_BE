const express = require("express");
const services = require("D:/DST/data_smart_tech_BE/JSON files/services_data.json");
const Teams = require("./JSON files/Teams/Teams.json");
const Testimonials = require("./JSON files/Testimonials.json");
const routes = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
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
// Mail management

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thisismemohan@gmail.com",
    pass: "ihqlnspfslihxlkh",
  },
});
app.post("/send-mail", (req, res) => {
  const { Fname, Lname, Contact_number, email, address, message } = req.body;
  const recivers = [
    "ssudhakaran@datasmarttech.com",
    "shimagiri@datasmarttech.com",
    "ssaravanan@datasmarttech.com",
    "contract@datasmarttech.com",
    "thisismemohan@gmail.com",
  ];
  const mailOptions = {
    from: "mohan",
    to: recivers.join(","),
    subject: "New Form Submission.",
    text: `Fname : ${Fname}\n\nLname : ${Lname}\n\nEmail : ${email}\n\nContact_number : ${Contact_number}\n\nAddress : ${address}\n\nMessage : ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Mail not sent!" });
    }
    console.log("Mail sent!:" + info.response);
    return res.status(200).json({ message: "Mail sent successfully!" });
  });
});

app.use("/Services", (req, res) => {
  res.send(services);
});
app.get("/Teams", (req, res) => {
  res.send(Teams);
});
app.get("/Teams/:id", (req, res) => {
  const memberId = Number(req.params.id);
  let findMember = null;
  for (const group of Teams.data) {
    if (Array.isArray(group.members)) {
      findMember = group.members.find((member) => member.id === memberId);
      if (findMember) break;
    }
  }
  if (findMember) {
    res.json(findMember);
  } else {
    res.status(404).json({ message: "member not found" });
  }
});
app.use("/Testimonials", (req, res) => {
  res.send(Testimonials);
});

app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});
