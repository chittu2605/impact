const { sendMail } = require("../../../utils/emailer");

module.exports = (app) => {
  const {
    passwordDecrypt,
    passwordEncrypt,
  } = require("../../../utils/passwordEncrypt");

  const {
    LOGIN_ADP,
    GET_CHILD_DETAILS,
    UPDATE_PASSWORD,
  } = require("../../adpQuery/Login/login");
  //   const { LOGIN_ADP } = require("../../adpQuery/login/login");
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require("body-parser");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });
  let mailOptions = (error) => {
    return {
      from: "support@iloveimpact.store",
      to: "ssharma94.eie@gmail.com",
      subject: "Error Log",
      text: error,
    };
  };

  const getChildDetails = (childId, adpId) =>
    new Promise((resolve, reject) =>
      connection.query(
        GET_CHILD_DETAILS(childId, adpId),
        (error, results, fields) => {
          if (error) {
            console.log(error);
            resolve(false);
          } else if (results.length == 0) {
            resolve(false);
          } else {
            resolve(results[0]);
          }
        }
      )
    );

  app.post("/adp/login", urlencodedParser, async (req, res) => {
    const password = req.body.password;
    const adpId = req.body.adpId;

    connection.query(LOGIN_ADP(adpId), async (error, results, fields) => {
      sendMail(mailOptions(error));
      if (error) return res.sendStatus("401");
      if (results.length === 0) return res.sendStatus("404");
      const hash = await passwordDecrypt(password, results[0].password).then(
        (result) => {
          if (!result) return res.sendStatus("401");
          let user = {
            adp_id: results[0].adp_id,
            user_type: results[0].user_type,
            name: `${results[0].firstname} ${results[0].lastname}`,
          };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
          });
          res.cookie("jwt", accessToken);
          res.json({
            authenticated: result,
            userType: results[0].user_type,
            name: `${results[0].firstname} ${results[0].lastname}`,
            adp_id: results[0].adp_id,
          });
        }
      );
    });
  });

  app.get("/adp/child-login", async (req, res) => {
    const childId = req.query.childId;
    const adpId = req.user.parent_id ? req.user.parent_id : req.user.adp_id;
    const childDetails = await getChildDetails(childId, adpId);
    if (childDetails) {
      const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
      if (token == null) res.sendStatus(401);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCookie) => {
        if (err) {
          res.sendStatus(401);
        } else {
          const childId = childDetails.adp_id;
          const childName = `${childDetails.firstname} ${childDetails.lastname}`;
          const user = {
            adp_id: childId,
            userType: userCookie.user_type,
            authenticated: true,
            name: childName,
            parent_id: adpId,
            parent_name: userCookie.name,
          };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
          });
          res.clearCookie("jwt");
          res.cookie("jwt", accessToken);
          res.json({
            childId,
            childName,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  });

  app.get("/adp/child-logout", (req, res) => {
    const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
    if (token == null) res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCookie) => {
      if (err) {
        res.sendStatus(401);
      }
      if (userCookie.parent_id) {
        const user = {
          adp_id: userCookie.parent_id,
          userType: userCookie.user_type,
          authenticated: true,
          name: userCookie.parent_name,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });
        res.clearCookie("jwt");
        res.cookie("jwt", accessToken);
      }
      res.sendStatus(205);
    });
  });

  app.post("/adp/validateToken", (req, res) => {
    const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      console.log(decoded);

      // res.cookie('jwt',"");
      if (decoded) {
        return res.json({
          status: "success",
          adp_id: decoded.adp_id,
          authenticated: true,
          name: decoded.name,
          parent_id: decoded.parent_id,
          parent_name: decoded.parent_name,
        });
      } else {
        res.sendStatus("401");
      }
    });
    //   res.sendStatus("200")
  });

  app.post("/adp/change-password", async (req, res) => {
    const adpId = req.user.adp_id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    connection.query(LOGIN_ADP(adpId), async (error, results, fields) => {
      if (error) {
        res.sendStatus(404);
      } else {
        const adp = results[0];
        const isPasswordValid = await passwordDecrypt(
          oldPassword,
          adp.password
        );
        if (isPasswordValid) {
          const encryptedPassword = await passwordEncrypt(newPassword);
          connection.query(
            UPDATE_PASSWORD(adpId, encryptedPassword),
            (error, results) => {
              if (error) {
                console.log(error);
                res.sendStatus(500);
              } else {
                res.sendStatus(200);
              }
            }
          );
        } else {
          res.sendStatus(401);
        }
      }
    });
  });

  app.post("/adp/logout", (req, res) => {
    res.cookie("jwt", "");
    return res.sendStatus(205);
  });
};
