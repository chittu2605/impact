const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "iloveimpact.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
