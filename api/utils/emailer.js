const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env_test") });
console.log(process.env.EMAIL);
const nodemailer = require("nodemailer");
const { send } = require("process");

let transporter = nodemailer.createTransport({
  // host: "mail.iloveimpact.store",
  // port: 465,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// let mailOptions = {
//   from : "support@iloveimpact.store",
//   to: "cool09shubham@gmail.com",
//   subject: "testing",
//   text: "It works",
// }

// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//     console.log("error Occured", err)
//   } else {
//     console.log("Email Sent")
//   }
// })

const sendMail = (options) => {
  transporter.sendMail(options, (err, data) => {
    if (err) {
      console.log("error Occured", err);
    } else {
      console.log("Email Sent");
    }
  });
};

module.exports.sendMail = sendMail;
