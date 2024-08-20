const { where, DatabaseError } = require("sequelize");
const studentProfile = require("../Database/modal/studentprofile");
const { generatePassword } = require("../password/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const feestructure = require("../Database/modal/feestructure");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const nodemailer = require("nodemailer");
const { default: axios } = require("axios");
const { sendMail } = require("../mail");

const createstudent = async (params) => {
  try {
    if (params.feestructureId) {
      var checkFeeStructure = await feestructure.findOne({
        where: {
          feestrutureId: params.feestructureId,
        },
        raw: true,
      });

      console.log(checkFeeStructure);
      if (!checkFeeStructure) {
        return {
          statusCode: 400,
          status: true,
          message: "Invalid Fee structure",
          data: {},
        };
      }
    }

    let info = {
      Name: params.Name,
      EmailId: params.EmailId,
      password: params.password,
      mobileNumber: params.mobileNumber,
      Role: params.Role,
      Designation: params.Designation,
      is_FirstGraduate: params.is_FirstGraduate,
      category: params.category,
      currentYear: params.currentYear,
      feestructureId: params.feestructureId,
    };

    info.password = await generatePassword(params.password);

    let checkEmailExists = await studentProfile.findOne({
      where: { EmailId: params.EmailId },
    });

    let checkMobileNumberExists = await studentProfile.findOne({
      where: { mobileNumber: params.mobileNumber },
    });

    if (checkEmailExists) {
      return {
        statusCode: 400,
        status: true,
        message: "EmailId already exists",
        data: {},
      };
    }
    if (checkMobileNumberExists) {
      return {
        statusCode: 400,
        status: true,
        message: "mobileNumber already exists",
        data: {},
      };
    } else {
      var result = await studentProfile.create(info);
      let createStudentFeeData = {
        feestructureId: params.feestructureId,
        Designation: params.Designation,
        year: params.currentYear,
        TuitionFee: checkFeeStructure.TuitionFee,
        BusFee: checkFeeStructure.BusFee,
        BookFee: checkFeeStructure.BookFee,
        FirstGraduate_discount: checkFeeStructure.FirstGraduate_discount,
        Reserved_students_Discount:
          checkFeeStructure.Reserved_students_Discount,
        paidStatus: params.paidStatus || "pending",
        TotalAmount:
          checkFeeStructure.TuitionFee +
          checkFeeStructure.BusFee +
          checkFeeStructure.BookFee,
        studentId: result.profileId,
      };

      if (
        ["BC"].includes(params?.category) &&
        !["true"].includes(params?.is_FirstGraduate)
      ) {
        createStudentFeeData.TotalAmount =
          (checkFeeStructure.TotalAmount *
            checkFeeStructure.Reserved_students_Discount) /
          100;

        let percentage =
          checkFeeStructure.TotalAmount - createStudentFeeData.TotalAmount;
        createStudentFeeData.TotalAmount = percentage;

        let createstudentfeestructure = await studentFeestruture.create(
          createStudentFeeData
        );
        let updatestudentprofile = await studentProfile.update(
          {
            studentFeestrutureId:
              createstudentfeestructure.studentFeestrutureId,
          },
          { where: { profileId: result.profileId } }
        );

        if (updatestudentprofile) {
          return {
            statusCode: 200,
            status: true,
            message: "create",
            data: {},
          };
        }
      } else if (
        ["true"].includes(params?.is_FirstGraduate) &&
        !["BC"].includes(params?.category)
      ) {
        createStudentFeeData.TotalAmount =
          (checkFeeStructure.TotalAmount *
            checkFeeStructure.FirstGraduate_discount) /
          100;

        let percentage =
          checkFeeStructure.TotalAmount - createStudentFeeData.TotalAmount;
        createStudentFeeData.TotalAmount = percentage;

        let createstudentfeestructure = await studentFeestruture.create(
          createStudentFeeData
        );
        let updatestudentprofile = await studentProfile.update(
          {
            studentFeestrutureId:
              createstudentfeestructure.studentFeestrutureId,
          },
          { where: { profileId: result.profileId } }
        );

        if (updatestudentprofile) {
          return {
            statusCode: 200,
            status: true,
            message: "create",
            data: {},
          };
        }

        if (result) {
          return {
            statusCode: 200,
            status: true,
            message: "create",
            data: {},
          };
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "not created",
            data: {},
          };
        }
      } else if (
        ["true"].includes(params?.is_FirstGraduate) &&
        ["BC"].includes(params?.category)
      ) {
        createStudentFeeData.TotalAmount =
          (checkFeeStructure.TotalAmount *
            checkFeeStructure.FirstGraduate_discount) /
          100;
        let percentage =
          checkFeeStructure.TotalAmount - createStudentFeeData.TotalAmount;
        let total =
          (percentage * checkFeeStructure.Reserved_students_Discount) / 100;
        let totalpercentage = total - createStudentFeeData.TotalAmount;
        createStudentFeeData.TotalAmount = totalpercentage;

        let createstudentfeestructure = await studentFeestruture.create(
          createStudentFeeData
        );
        let updatestudentprofile = await studentProfile.update(
          {
            studentFeestrutureId:
              createstudentfeestructure.studentFeestrutureId,
          },
          { where: { profileId: result.profileId } }
        );

        if (updatestudentprofile) {
          return {
            statusCode: 200,
            status: true,
            message: "create",
            data: {},
          };
        }
      }
      if (result) {
        return {
          statusCode: 200,
          status: true,
          message: "create",
          data: {},
        };
      } else {
        return {
          statusCode: 400,
          status: true,
          message: "not created",
          data: {},
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: true,
      message: error.message,
    };
  }
};

const updatestudent = async (params) => {
  let profileId = params.profileId;
 
 
  let result = await studentProfile.update(
    { Name: params.Name },
    { where: { profileId: profileId } }
  );
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "updated",
      data: {},
    };
  } else {
    return {
      status: 400,
      message: " not updated",
      data: {},
    };
  }
};

const liststudent = async (params) => {
  let result = await studentProfile.findAll();

  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "sended",
      data: result,
    };
  } else {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

const getByIdstudent = async (params) => {
  let profileId = params.profileId;
  let result = await studentProfile.findOne({
    where: { profileId: profileId },
  });
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "sended",
      data: result,
    };
  } else {
    return {
      statusCode: 404,
      status: false,
      message: "data not found",
      data: {},
    };
  }
};

const deletestudent = async (params) => {
  let profileId = params.profileId;
  let result = await studentProfile.destroy({
    where: { profileId: profileId },
  });
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "deleted",
      data: result,
    };
  } else {
    return {
      statusCode: 400,
      status: false,
      message: "data not found",
      data: {},
    };
  }
};

const tokenGenerate = async (params) => {
  let password = params.password;
  let EmailId = params.EmailId;

  let result = await studentProfile.findOne({
    where: { EmailId: params.EmailId },
    raw: true,
  });
  if (result) {
    let comparepass = await bcrypt.compare(password, result.password);
    if (comparepass) {
      let generateToken = jwt.sign(result, process.env.secretKey, {
        expiresIn: "1D",
      });
      result.generateToken = generateToken;
      return {
        statusCode: 200,
        status: true,
        message: "login successful",
        data: result,
      };
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "invalid password",
        data: {},
      };
    }
  } else {
    return {
      statusCode: 400,
      status: true,
      message: "data not found",
      data: {},
    };
  }
};
const verifyToken = async (params) => {
  let token = params.authorization;
  var generatetoken = await generateToken(token);
  console.log("generatetoken", generatetoken);
  if (generatetoken.Role == "Student") {
    var result = await studentFeestruture.findAll({
      where: { studentFeestrutureId: generatetoken.studentFeestrutureId },
      raw: true,
    });
    if (result.length > 0) {
      const mailsend = await sendMail(generatetoken.EmailId, result);
      console.log("mailsend", mailsend);
      if (mailsend) {
        return {
          statusCode: 200,
          status: true,
          message: "Email sent successfully",
          data: {},
        };
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "Something Went Wrong",
          data: {},
        };
      }
    }
  }

  // let url = "http://localhost:4000/send/Mail";

  // let sendData = await axios(url, result)

  // console.log("wenjdcejkew" , sendData)

  //   .then(() => {
  //     console.log("Data Sent");
  //   })
  //   .catch((Err) => {
  //     console.log("errr", Err);
  //   });

  // if (result) {
  //   return {
  //     statusCode: 200,
  //     status: true,
  //     message: "success",
  //     data: result,
  //   };
  // }
  // if (generateToken) {
  //   return {
  //     statusCode: 200,
  //     status: true,
  //     message: "valid",
  //     data: {},
  //   };
  // }
  else {
    return {
      statusCode: 400,
      status: true,
      message: "invalid",
      data: {},
    };
  }
};

module.exports = {
  createstudent,
  updatestudent,
  liststudent,
  getByIdstudent,
  deletestudent,
  tokenGenerate,
  verifyToken,
};
