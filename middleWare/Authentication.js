const jwt = require("jsonwebtoken");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const studentProfile = require("../Database/modal/studentProfile");
const joi = require("joi");
const staffprofile = require("../Database/modal/staffprofile");

const verifyToken = async (req, res, next) => {
  try {
   
    var token = req.headers.authorization;

    var Token = jwt.verify(token, process.env.secretKey);

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
        where: { staffId: Token.staffId, is_deleted: false },
        raw: true,
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

const verifyRole = (role = []) =>
  async function (req, res, next) {
    try {
      
      var token = req.headers.authorization;

      var Token = jwt.verify(token, process.env.secretKey);
     
      if ( role.includes(Token.Role)) {
           
        next()
      } else {
        res.status(400).json({
          status: 400,
          message:"error",
          data: {},
        }); 
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
        data: {},
      });
    }
  };

module.exports = { verifyToken, verifyRole };
