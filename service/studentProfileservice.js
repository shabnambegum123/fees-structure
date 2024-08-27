const { where, DatabaseError } = require("sequelize");
const studentProfile = require("../Database/modal/studentprofile");
const { generatePassword } = require("../password/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const feestructure = require("../Database/modal/feestructure");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const nodemailer = require("nodemailer");
const { default: axios, all } = require("axios");

const { generateToken } = require("../token");
const { raw } = require("body-parser");
const { axiosFunction } = require("../axios");
const { pagaMetaService } = require("../helpers/pagination");
const { string } = require("joi");
// create student profile
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

// update student profile
const updatestudent = async (params) => {
  try {
    if (params.password) {
      params.password = await generatePassword(params.password);
    }
    var result = await studentProfile.update(params, {
      where: { profileId: params.profileId },
      returning: true,
    });

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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

// list student profile and pagenation
const liststudent = async (params) => {
  try {
    let result = await studentProfile.findAll({
      offset: +params.page,
      limit: +params.limit,
      raw: true,
    });
    let profileId = params.profileId;
    
    if (!!params.profileId ) {
       let totalData = (
        await studentProfile.findOne({ where:{ profileId: profileId}})
      ).length;
      
      if (result.length > 0) {
        return {
          statusCode: 200,
          status: true,
          message: "sended",
          data: await pagaMetaService(
            +params.page,
            +params.limit,
            result,
            totalData
          ),
        };
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "data not found",
          data: {},
        };
      }
    } else {
      
      let totalData = (await studentProfile.findAll()).length;

      if (result.length > 0) {
        return {
          statusCode: 200,
          status: true,
          message: "sended",
          data: await pagaMetaService(
            +params.page,
            +params.limit,
            result,
            totalData
          ),
        };
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "data not found",
          data: {},
        };
      }
    }
  } catch (error) {
    console.log("qewgqewf", error);
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: error,
    };
  }
};
// get student by Id
const getByIdstudent = async (params) => {
  console.log(params);
  try {
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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

// soft delete

const deletestudent = async (params) => {
  try {
    let profileId = params.profileId;
    let result = await studentProfile.update(
      { is_deleted: true },
      {
        where: { profileId: profileId },
      }
    );
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
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

// Login for student profile

const tokenGenerate = async (params) => {
  try {
    let password = params.password;
    let EmailId = params.EmailId;
    let allow = await studentProfile.findOne({
      where: { is_suspended: false },
      raw: true,
    });
    if (allow) {
      var result = await studentProfile.findOne({
        where: { EmailId: params.EmailId },
        raw: true,
      });

      if (result) {
        let value = {
          EmailId: result.EmailId,
          Name: result.Name,
          profileId: result.profileId,
          Role: result.Role,
        };
        let comparepass = await bcrypt.compare(password, result.password);
        if (comparepass) {
          let generateToken = jwt.sign(value, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
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
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "you are suspended",
        data: {},
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};
// verify the token and send the mail to the student which has there fees structure
const verifyToken = async (params) => {
  try {
    let studentFeestrutureId = params.studentFeestrutureId;

    var result = await studentFeestruture.findAll({
      where: { studentFeestrutureId: studentFeestrutureId },
      raw: true,
    });

    let EmailId = params.EmailId;
    console.log(EmailId);
    let url = process.env.studentUrl;
    const axios = await axiosFunction(result, url, EmailId);
    if (axios) {
      return {
        statusCode: 200,
        status: true,
        message: "login successful",
        data: {},
      };
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "user not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

const joinstudentIdService = async (params) => {
  try {
    let studentId = params.studentId;
    var result = await stu;
  } catch (error) {
    return {
      status: 400,
      message: "error",
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
  joinstudentIdService,
};
