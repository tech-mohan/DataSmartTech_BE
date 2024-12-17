const express = require("express");
const services = require("D:/DST/data_smart_tech_BE/JSON files/services_data.json");
const Teams = require("./JSON files/Teams/Teams.json");
const Testimonials = require("./JSON files/Testimonials.json");
const events = require("./JSON files/events.json");
const routes = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const fs = require("fs");

const pool = mysql.createPool({
  host: "103.211.216.223",
  user: "krisajvk_dst",
  password: "D=7wFPQ8_P[N",
  database: "krisajvk_datasmart",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// import json to sql
const servicesJsonData = JSON.parse(
  fs.readFileSync("JSON files/services_data.json", "utf8")
);

const query = "insert into services (id,title,image,content) values ?";
const values = servicesJsonData.map((item) => [
  item.id,
  item.title,
  item.image,
  item.content,
]);

// pool.query(query, [values], (err, result) => {
//   if (err) {
//     console.error("error:", err);
//   } else {
//     console.log("data inserted", result);
//   }
//   pool.end();
// });
// inserted

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
// Database api creation

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
    // "ssudhakaran@datasmarttech.com",
    // "shimagiri@datasmarttech.com",
    // "ssaravanan@datasmarttech.com",
    // "contract@datasmarttech.com",
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

// api creation
// teams

app.get("/departments", async (req, res) => {
  try {
    const [departments] = await pool.query(
      "select members.id,departments.name as department,members.name as member_name,members.role,members.image from members join departments on members.department_id = departments.id order by members.id"
    );
    res.json(departments);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("error");
  }
});
// testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM testimonials");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("error");
  }
});

// Services page api

// app.get("/Services", async (req, res) => {
//   try {
//     const query = "select * from services";
//     const [services] = await pool.query(query);
//     res.json(services);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("error");
//   }
// });

// services page details

app.get("/Services", (req, res) => {
  res.send(services);
});

// member details
app.get("/member/:id", async (req, res) => {
  try {
    const [members] = await pool.query(
      "select members.id,departments.name as department,members.name as member_name,members.role,members.image from members join departments on members.department_id = departments.id order by members.id"
    );
    console.log(members);
    const memberId = Number(req.params.id);
    const member = members.find((item) => item.id === memberId);
    console.log(member);
    res.json(member);
  } catch (err) {
    console.error(err);
  }

  // const json = res.json(departments);
  // console.log(Array.isArray(json));
  // const memberData = Object.keys(departments);
  // console.log(departments);
  // const memberId = Number(req.params.id);
  // const member = departments.find((item) => item.id === memberId);
  // console.log(departments);
  // let findMember = null;
  // for (const group of memberData) {
  //   if (Array.isArray(group.members)) {
  //     findMember = group.members.find((member) => member.id === memberId);
  //     if (findMember) break;
  //   }
  // }
  // if (findMember) {
  //   res.json(findMember);
  // } else {
  //   res.status(404).json({ message: "member not found" });
  // }
});
app.use("/Testimonials", (req, res) => {
  res.send(Testimonials);
});

// events

app.get("/Events", (req, res) => {
  res.send(events);
});

app.listen(8000, () => {
  console.log("Server running at localhost:8000");
});
