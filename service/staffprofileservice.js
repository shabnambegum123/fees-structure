const staffprofile = require("../Database/modal/staffprofile");
const bcrypt = require("bcrypt");
const { generatePassword } = require("../password/bcrypt");
const jwt = require("jsonwebtoken");
const { param } = require("../Router/router");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const { generateToken } = require("../token");
const studentProfile = require("../Database/modal/studentprofile");
const { default: axios, all } = require("axios");
const { PendingMail, axiosFunction } = require("../axios");
const { pagaMetaService } = require("../helpers/pagination");
// create staffProfile
const createstaffprofile = async (params) => {
  try {
    var info = {
      Name: params.Name,
      EmailId: params.EmailId,
      password: params.password,
      Role: params.Role,
      Designation: params.Designation,
    };
    info.password = await generatePassword(params.password);

    let checkEmailExists = await staffprofile.findOne({
      where: { EmailId: params.EmailId },
    });

    if (checkEmailExists) {
      return {
        statusCode: 400,
        status: false,
        message: "EmailId already exist",
        data: {},
      };
    } else {
      let result = await staffprofile.create(info);

      if (result) {
        return {
          statusCode: 200,
          status: true,
          message: "created",
          data: {},
        };
      } else {
        return {
          statusCode: 400,
          status: false,
          message: " not created",
          data: {},
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};

// update Profile
const updatestaffprofile = async (params) => {
  try {
    if (params.password) {
      params.password = await generatePassword(params.password);
    }
    var result = await staffprofile.update(params, {
      where: { staffId: params.staffId },
      returning: true,
    });
    console.log(result);
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "updated",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};
// list profile and pagenation
const liststaffprofile = async (params) => {
  try {
    let whereQuery = {};

    if (params.staffId) {
      whereQuery.staffId = params.staffId;
    }

    let result = await staffprofile.findAll({
      where: whereQuery,
      limit: +params.limit,
      offset: (params?.page - 1) * params?.limit,
    });

    if (result.length > 0) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
        data: await pagaMetaService(
          +params.page,
          +params.limit,
          result,
          result.length
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
// getId by list
const getByIdstaffprofile = async (params) => {
  try {
    let staffId = params.staffId;
    let result = await staffprofile.findOne({
      attributes: ["Name", "EmailId", "staffId", "Role", "Designation"],
      where: {
        staffId: staffId,
      },
    });
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "success",
        data: result,
      };
    } else {
      return {
        status: 400,
        message: "not found",
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

const deletestaffprofile = async (params) => {
  try {
    let staffId = params.staffId;

    let result = await staffprofile.update(
      { is_deleted: "true" },
      {
        where: { staffId: staffId },
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
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};

// login Profile
const loginstaffProfile = async (params) => {
  try {
    let EmailId = params.EmailId;
    let password = params.password;
    let allow = await staffprofile.findOne({ where: { is_deleted: false } });
    if (allow) {
      var result = await staffprofile.findOne({
        where: { EmailId: params.EmailId },
        raw: true,
      });

      if (result) {
        let value = {
          EmailId: result.EmailId,
          Name: result.Name,
          staffId: result.staffId,
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
            message: "Login successful",
            data: result,
          };
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "Invelid password",
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
    }
  } catch (error) {
    return {
      status: 400,
      message: "error",
      data: {},
    };
  }
};

// To add the fineAmount in studentfeestructure in json format ... if fineAmount already exists push the fineAmount in the array and also update the amount the in the totalAmount column
const   staffToken = async (param) => {
  try {
    let studentId = param.studentId;
    let result = await studentFeestruture.findOne(
      { where: { studentId: studentId } },
      { raw: true }
    )
     if (result.fineAmount === null) {
      let updatestudentFeeStructure = await studentFeestruture.update(
        { fineAmount: param.fineAmount },
        { where: { studentId: studentId } }
      );

      if (updatestudentFeeStructure) {
        var amount = await studentFeestruture.findOne({
          where: { studentId: param.studentId },
          raw: true,
        });
        console.log(amount);
        let finalTotalAmount = await studentFeestruture.update(
          { TotalAmount: amount.fineAmount.Amount + amount.TotalAmount },
          { where: { studentId: param.studentId } }
        );
        if (finalTotalAmount) {
          return {
            statusCode: 200,
            status: true,
            message: "updated",
            data: {},
          };
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "error",
            data: {},
          };
        }
      } else {
        return {
          statusCode: 400,
          status: true,
          message: "error",
          data: {},
        };
      }
    } else if (result.fineAmount.length > 0) {
      result.fineAmount.push(param.fineAmount);
      var updatestudentFeeStructure = await studentFeestruture.update(
        { fineAmount: result.fineAmount },
        { where: { studentId: param.studentId } }
      )
      if (updatestudentFeeStructure) {
        var amount = await studentFeestruture.findOne({
          where: { studentId: param.studentId },
          raw: true,
        });
        let a = 0;
        for (let item of amount.fineAmount) {
          if (item) {
            a += item.Amount;
          }
        }
        let finalTotalAmount = await studentFeestruture.update(
          { TotalAmount: amount.TotalAmount + a },
          { where: { studentId: param.studentId } }
        );
        if (finalTotalAmount) {
          return {
            statusCode: 200,
            status: true,
            message: "updated",
            data: {},
          }
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "error",
            data: {},
          };
        }
      } else {
        return {
          statusCode: 400,
          status: true,
          message: "error",
          data: {},
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    }
  }
}

// if fees is delay staff should send the mail to student  that  they have pending
const paymentmail = async () => {
  try {
    var result = await studentFeestruture.findAll({
      where: { paidStatus: "pending" },
      raw: true,
    });
    if (!result || result.length === 0) {
      return {
        statusCode: 404,
        status: false,
        message: "No pending fees found",
        data: {},
      };
    }
    if (result) {
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        var find = await studentProfile.findOne({
          where: { profileId: item.studentId },
          raw: true,
        });

        if (find) {
          let EmailId = find.EmailId;
          let TotalAmount = item.TotalAmount;

          let url = process.env.pendingUrl;
          const axios = await axiosFunction(TotalAmount, url, EmailId);

          // if (axios) {
          //   return {
          //     statusCode: 200,
          //     status: true,
          //     message: "sended",
          //     data: {},
          //   };
          // } else {
          //   return {
          //     statusCode: 400,
          //     status: true,
          //     message: "error",
          //     data: {},
          //   };
          // }
        } else {
          return {
            statusCode: 400,
            status: true,
            message: "error",
            data: {},
          };
        }
      }
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "error",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: true,
      message: error.message,
      data: {},
    };
  }
};

const updatePaidFeeservice = async (params) => {
  try {
    if (params.fineAmount) {
      var checkStudentFees = await studentFeestruture.findOne({
        where: { studentFeestrutureId: params.studentFeestrutureId },
        raw: true,
      });
      console.log("checkStudentFees" , checkStudentFees);
      if (!checkStudentFees) {
        return {
          statusCode: 404,
          status: false,
          message: "Profile not found",
          data: {},
        }
      }
      
      if (checkStudentFees.fineAmount && checkStudentFees.fineAmount.length > 0) {
        let value = params?.fineAmount?.Amount;
        var exactValue = checkStudentFees?.TotalAmount - value;
        let filteredFineAmount = checkStudentFees.fineAmount.map((x) => {
          if (x.type == params.fineAmount.type) {
            x.paidstatus = "PAID",
            x.paymentDoneBy = params.staffId
          }
          return x
        })
        var update = await studentFeestruture.update(
          { fineAmount: filteredFineAmount, TotalAmount: exactValue },
          { where: { studentFeestrutureId: params.studentFeestrutureId } }
        );
        if (update) {
          return {
            statusCode: 200,
            status: true,
            message: "updated",
            data: update,
          };
        } else {
          return {
            statusCode: 400,
            status: false,
            message: "not found",
            data: {},
          };
        }
      }
      return {
        statusCode: 400,
        status: true,
        message: "Fine Amount not found",
        data: {},
      };
    }

     } catch (error) {
    return {
      statusCode: 400,
      status: true,
      message: error.message,
      data: {},
    };
  }
};

module.exports = {
  createstaffprofile,
  updatestaffprofile,
  liststaffprofile,
  getByIdstaffprofile,
  deletestaffprofile,
  loginstaffProfile,
  staffToken,
  paymentmail,
  updatePaidFeeservice,
};
