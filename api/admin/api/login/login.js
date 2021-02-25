const { updateLocale } = require("moment");
const connection = require("../../../dbConnect");
const { sendMail } = require("../../../utils/emailer");

const passwordEncrypt = require("../../../utils/passwordEncrypt")
  .passwordEncrypt;
const passwordDecrypt = require("../../../utils/passwordEncrypt")
  .passwordDecrypt;
const {
  SELECT_USER_BY_USERNAME,
  INSERT_OTP,
} = require("../../dbQuery/login/loginQuery");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const sendOtp = (userId, email) => {
  const otp = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1);
  updateOtp(userId, otp);
  sendOtpMail(otp, email);
};

const sendOtpMail = (otp, email) => {
  sendMail(otpMailOptions(email, otp));
};

const updateOtp = (userId, otp) => {
  connection.query(INSERT_OTP(userId, otp), (error, results, fields) => {
    if (error) {
      console.log(error);
    }
  });
};

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let mailOptions = (error) => {
  return {
    from: "support@iloveimpact.com",
    to: "ssharma94.eie@gmail.com",
    subject: "Error Log",
    text: error,
  };
};

let otpMailOptions = (to, otp) => {
  return {
    from: "support@iloveimpact.com",
    to: to,
    subject: "Impact Admin Login Otp",
    text: `use otp ${otp} to login to admin site`,
  };
};

module.exports = (app) => {
  const connection = require("../../../dbConnect");
  app.post("/admin/login", urlencodedParser, async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;

    connection.query(
      SELECT_USER_BY_USERNAME(username),
      async (error, results, fields) => {
        console.log(error);
        sendMail(mailOptions(error));

        if (error) return res.sendStatus("401");
        if (results.length === 0) return res.sendStatus("404");
        const hash = await passwordDecrypt(password, results[0].password).then(
          (result) => {
            if (!result) return res.sendStatus("401");
            const userId = results[0].adp_id;
            sendOtp(userId, results[0].email);
            const token = {
              userForOtp: userId,
            };
            const accessToken = jwt.sign(
              token,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: process.env.TOKEN_EXPIRE_TIME }
            );
            res.cookie("jwt", accessToken);
            res.sendStatus(200);
          }
        );
      }
    );
  });

  app.post("/admin/validateOtp", (req, res) => {
    const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
    const otp = req.body.otp;
    if (token == null) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCookie) => {
      const adminId = userCookie.userForOtp;
      connection.query(
        SELECT_USER_BY_USERNAME(adminId),
        async (error, results, fields) => {
          if (error) {
            res.sendStatus("401");
          } else {
            if (otp == results[0].otp) {
              let user = {
                adp_id: results[0].adp_id,
                user_type: results[0].user_type,
              };
              const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRE_TIME }
              );
              res.cookie("jwt", accessToken);
              res.json({
                authenticated: true,
                userType: results[0].user_type,
                firstName: results[0].firstname,
              });
            } else {
              res.sendStatus("401");
            }
          }
        }
      );
    });
  });

  app.post("/validateToken", (req, res) => {
    // const token = req.headers.cookie && req.headers.cookie.split("=")[1];
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
    //     console.log(decoded) // bar
    //     // res.cookie('jwt',"");
    //     return res.json(decoded)
    //   });
    res.sendStatus("200");
  });

  app.post("/admin/logout", (req, res) => {
    res.cookie("jwt", "");
    return res.sendStatus(205);
  });
};
