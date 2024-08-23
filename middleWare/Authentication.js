const jwt = require("jsonwebtoken");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const studentProfile = require("../Database/modal/studentprofile");
const joi = require("joi")

const verifyToken = async (req, res, next) => {
  var token = req.headers.authorization;
  try {
    const Token = await jwt.verify(token, process.env.secretKey);
    if (Token) {
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

const verifyRole = async () => {
  try {
   

    } catch (error) {
      console.log(error);
    }
  
};



module.exports = { verifyToken , verifyRole  }
