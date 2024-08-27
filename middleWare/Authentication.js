const jwt = require("jsonwebtoken");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const studentProfile = require("../Database/modal/studentprofile");
const joi = require("joi");
const staffprofile = require("../Database/modal/staffprofile");

const verifyToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;

    var Token = await jwt.verify(token, process.env.secretKey);

    console.log("weeKsdage", Token);

    if (Token.profileId) {
      const allow = await studentProfile.findOne({
        where: { profileId: Token.profileId, is_deleted: false },
      });
      if (allow) {
        req.user = allow;
        next();
      } else {
        res.status(400).json({
          status: 400,
          message: "user doesn't exist",
          data: {},
        });
      }
    } else {
      const allow = await staffprofile.findOne({
        where: { staffId: Token[0].staffId, is_deleted: false },
      });

      if (allow) {
        req.user = allow;
        next();
      } else {
        res.status(400).json({
          status: 400,
          message: "user doesn't exist",
          data: {},
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

// authorization

const verifyRole = async () => {
  try {
   console.log()
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyToken, verifyRole };
