const { where, DatabaseError, STRING } = require("sequelize");
const studentProfile = require("../Database/modal/studentprofile");
const { generatePassword } = require("../password/bcrypt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const feestructure = require("../Database/modal/feestructure");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const nodemailer = require("nodemailer");
const { default: axios, all } = require("axios");
const path = require("path");
const { generateToken } = require("../helpers/token");
const { raw } = require("body-parser");
const { axiosFunction,updateStudentNotification, createStudentNotification, getStudentNotification,DeleteStudentNotification } = require("../helpers/axios");
const { pagaMetaService } = require("../helpers/pagination");
const { string } = require("joi");
const { param } = require("../Router/router");
const fs = require("fs");
var xlsx = require("xlsx");
const Sequelize = require("sequelize");
const sequelize = require("../Database/database");
const { profile } = require("console");
const Op = Sequelize.Op;

// create student profile

const createstudent = async (params) => {
  try {
    // input format 2006-01-01
    let DOB = params.DOB;

    let userDate = new Date(DOB.DOB).getFullYear();

    let formatDate = new Date().getFullYear();
    console.log(userDate, formatDate);
    let Difference = formatDate - userDate;

    if (Difference >= 18) {
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
          )
       console.log(result,"897087kjghj")
          let passData = {
            Name: result.Name,
            EmailId: result.EmailId,
            password: result.password,
            mobileNumber: result.mobileNumber,
            Role: result.Role,
            Designation: result.Designation,
            is_FirstGraduate:result. is_FirstGraduate ,
            category: result.category,
            currentYear: result.currentYear,
            feestructureId: result.feestructureId,
            profileId: result.profileId,
            is_deleted: result.is_deleted,
            is_suspended: result.is_suspended,
          }
          const axios = await createStudentNotification( passData);

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
            status: false,
            message: "not created",
            data: {},
          };
        }
      }
    } else {
      return {
        statusCode: 400,
        status: false,
        message: "you are not eligible",
      };
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
    })
    
   let passData ={
   ID : params.ID,
    Name : "hii"
   }
    const axios = await updateStudentNotification( passData);

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
    // let whereQuery = {};
    // if (params.is_deleted) {
    //   whereQuery = {
    //     is_deleted: Boolean(params.is_deleted),
    //   };
    // }
    // if (params.search) {
    //   whereQuery[Op.or] = [
    //     {
    //       Name: {
    //         [Op.like]: startsWith(params.search),
    //       },
    //     },
    //     {
    //       EmailId: {
    //         [Op.like]: params.search,
    //       },
    //     },
    //     {
    //       profileId: {
    //         [Op.like]: params.search,
    //       },
    //     },
    //   ];
    // }
    // if (params.key && params.order) {
    //   var order = { order: [[params.key, params.order]] };
    // } else {
    //   var order = { order: [["createdAt", "DESC"]] };
    // }
    // if (params.staffId) {
    //   whereQuery.staffId = params.staffId;
    // }
    // let result;
    // if (params.page && params.limit) {
    //   result = await studentProfile.findAll({
    //     where: whereQuery,
    //     limit: +params.limit,
    //     offset: (params?.page - 1) * params?.limit,
    //     order: order.order,
    //   });
    //   data = await pagaMetaService(
    //     +params.page,
    //     +params.limit,
    //     result,
    //     result.length
    //   );
    // } else {
    //   result = await studentProfile.findAll({
    //     where: whereQuery,
    //   });
    //   data = result;
    // }
    // if (result.length > 0) {
    //   return {
    //     statusCode: 200,
    //     status: true,
    //     message: "sended",
    //     data: data
    //   };
    // } else {
    //   return {
    //     statusCode: 400,
    //     status: false,
    //     message: "data not found",
    //     data: {},
    //   };
    // }
    // }
    // console.log(params.Name);
    // let search = await studentProfile.findAll({
    //   where: whereQuery,
    // });
    // console.log(search)
    // // return {
    //   statusCode: 200,
    //   status: false,
    //   message: "sended",
    //   data: search,
    // }
    // op.eq checks the number is equal
    // let result = await studentProfile.findAll({where:{profileId:{[Op.eq]:params.profileId}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.is defines the null value
    // let result = await studentProfile.findAll({where:{feestructureId:{[Op.is]:null}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.gt gives the profileId is greater than the given value
    // let result = await studentProfile.findAll({where:{profileId:{[Op.gt]:5}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.gte
    // let result = await studentProfile.findAll({where:{profileId:{[Op.gt]:5}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // Op.between
    // let result = await studentProfile.findAll({where:{profileId:{[Op.between]:[5,6]}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.notIn except that value
    // let result = await studentProfile.findAll({where:{profileId:{[Op.notIn]:[5,6]}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.in checks the value exists in list or not
    // let result = await studentProfile.findAll({where:{profileId:{[Op.in]:[5,6]}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // op.like exact name should must be given
    // let result = await studentProfile.findAll({where:{Name:{[Op.like]:params.Name}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
    // //op.iLike
    // let result = await studentProfile.findAll({where:{Name:{[Op.contains
    // ]:params.Name}}})
    // return {
    //   statusCode: 200,
    //   status: true,
    //   message: "sended",
    //   data:result,
    // };
  } catch (error) {
    console.log("qewgqewf", error);
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: error.messge,
    };
  }
};

// get student by Id
const getByIdstudent = async (params) => {
  console.log(params);
  try {
    let profileId = params.profileId;
    var result = await studentProfile.findOne({
      attributes: [
        "Name",
        "EmailId",
        "profileId",
        "Role",
        "is_FirstGraduate",
        "category",
        "currentYear",
        "feestructureId",
        "mobileNumber",
      ],
      where: {
        profileId: profileId,
      },
    })

   const axios = await  getStudentNotification (result)

    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
        data: axios.data,
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
      message: error.message,
      data: {},
    };
  }
};

// soft delete

const deletestudent = async (params) => {
  try {
    
    var profileId = params.profileId;
    var result = await studentProfile.update(
      { is_deleted: "true" },
      {
        where: { profileId: profileId },
      }
    )
    // let value ={
    //   profileId : params.profileId,
    //   is_deleted : true
    // }

    let value = {
      ID : params.ID
    }

    const axios = await  DeleteStudentNotification (value)
    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "deleted",
        data: {},
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
          let generatetoken = jwt.sign(value, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
          });
          result.generatetoken = generatetoken;

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

const restPasswordService = async (params) => {
  try {
    let profileId = params.profileId;
    let newPassword = params.newPassword;
    let confirmPassword = params.confirmPassword;
    let oldPassword = params.oldPassword;

    if (newPassword == confirmPassword) {
      var checkPassword = await studentProfile.findOne({
        where: { profileId: profileId },
        raw: true,
      });

      let comparepass = await bcrypt.compare(
        oldPassword,
        checkPassword.password
      );

      if (comparepass) {
        oldPassword = await generatePassword(oldPassword);
        let updatePassword = await studentProfile.update(
          { password: oldPassword },
          { where: { profileId: profileId } }
        );
        if (updatePassword) {
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
            message: "not updated",
            data: {},
          };
        }
      } else {
        return {
          statusCode: 400,
          status: true,
          message: "inCorrectPassword",
          data: {},
        };
      }
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "Conform password is INcorrect",
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

const forgetPasswordService = async (params) => {
  try {
    let EmailId = params.EmailId;
    var result = await studentProfile.findOne({
      where: { EmailId: EmailId },
      raw: true,
    });

    if (result) {
      let value = {
        EmailId: result.EmailId,
        Name: result.Name,
        profileId: result.profileId,
        Role: result.Role,
      };
      let generatetoken = jwt.sign(value, process.env.secretKey, {
        expiresIn: process.env.expiresIn,
      });
      result.generatetoken = generatetoken;
      let url = process.env.forgetPasswordurl;

      const axios = await axiosFunction(generatetoken, url, EmailId);
      if (axios) {
        return {
          statusCode: 200,
          status: true,
          message: "sended token",
          data: {},
        };
      }
    } else {
      return {
        statusCode: 400,
        status: false,
        message: "user not found",
        data: {},
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: {},
    };
  }
};

const changePasswordService = async (params) => {
  try {
    let password = params.password;

    let Password = await generatePassword(password.password);

    let check = await generateToken(params.token);

    let result = await studentProfile.update(
      { password: Password },
      { where: { profileId: check.profileId } }
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
        statusCode: 400,
        status: false,
        message: "not updated",
        data: {},
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: {},
    };
  }
};
const bulkCreateService = async (params) => {
  // let filePath = fs.readFileSync(params.path)
  //  const str = filePath .toString('utf8')

  try {
    let filePath = path.join(__dirname, `../${params.path}`);

    const workbook = xlsx.readFile(filePath);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    let data = [];
    for (let index = 1; index < 11; index++) {
      const Name = worksheet[`A${index}`]?.v;
      const EmailId = worksheet[`B${index}`]?.v;
      const password = worksheet[`C${index}`]?.v;
      const Role = worksheet[`D${index}`]?.v;
      const Designation = worksheet[`E${index}`]?.v;
      const is_FirstGraduate = worksheet[`F${index}`]?.v;
      const category = worksheet[`G${index}`]?.v;
      const currentYear = worksheet[`H${index}`]?.v;
      const feestrutureId = worksheet[`I${index}`]?.v;
      const mobileNumber = worksheet[`J${index}`]?.v;

      data.push({
        Name,
        EmailId,
        password,
        Role,
        Designation,
        is_FirstGraduate,
        category,
        currentYear,
        feestrutureId,
        mobileNumber,
      });
    }

    if (data.length > 0) {
      for (let i = 1; i < data.length; i++) {
        data[i].password = await generatePassword(data[i].password);
        var checkFeeStructure = await feestructure.findOne({
          where: {
            feestrutureId: data[i].feestrutureId,
          },
          raw: true,
        });
        let checkEmailExists = await studentProfile.findOne({
          where: { EmailId: data[i].EmailId },
        });

        let checkMobileNumberExists = await studentProfile.findOne({
          where: { mobileNumber: data[i].mobileNumber },
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
        }
        var result = await studentProfile.create(data[i]);
        let createStudentFeeData = {
          feestructureId: data[i].feestructureId,
          Designation: data[i].Designation,
          year: data[i].currentYear,
          TuitionFee: checkFeeStructure.TuitionFee,
          BusFee: checkFeeStructure.BusFee,
          BookFee: checkFeeStructure.BookFee,
          FirstGraduate_discount: checkFeeStructure.FirstGraduate_discount,
          Reserved_students_Discount:
            checkFeeStructure.Reserved_students_Discount,
          paidStatus: data[i].paidStatus || "pending",
          TotalAmount:
            checkFeeStructure.TuitionFee +
            checkFeeStructure.BusFee +
            checkFeeStructure.BookFee,
          studentId: result[i].profileId,
        };

        if (
          ["BC"].includes(data[i]?.category) &&
          !["true"].includes(data[i]?.is_FirstGraduate)
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
            { where: { profileId: result[i].profileId } }
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
          ["true"].includes(data[i]?.is_FirstGraduate) &&
          !["BC"].includes(data[i]?.category)
        ) {
          createStudentFeeData.TotalAmount =
            (checkFeeStructure.TotalAmount *
              checkFeeStructure.FirstGraduate_discount) /
            100;

          let percentage =
            checkFeeStructure.TotalAmount - createStudentFeeData.TotalAmount;
          createStudentFeeData.TotalAmount = percentage

          let createstudentfeestructure = await studentFeestruture.create(
            createStudentFeeData
          )
          let updatestudentprofile = await studentProfile.update(
            {
              studentFeestrutureId:
                createstudentfeestructure.studentFeestrutureId,
            },
            { where: { profileId: result[i].profileId } }
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
          ["true"].includes(data[i]?.is_FirstGraduate) &&
          ["BC"].includes(data[i]?.category)
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
            { where: { profileId: result[i].profileId } }
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
        // let result = await studentProfile.create(data[i]);
      }
      return {
        statusCode: 200,
        status: true,
        message: "updated",
        data: {},
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 400,
      status: false,
      message: error.message,
      data: {},
    };
  }
};

const PDFformatService = async (params) => {
  try {
    let data = {
      profileId: params.profileId,
      Name: params.Name,
      Designation: params.Designation,
      currentYear: params.currentYear,
    }

    let url = process.env.PdfUrl;
    const axios = await axiosFunction(data, url, params.EmailId);

    if (axios) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
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
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 400,
      status: false,
      message: "error",
      data: {},
    };
  }
};

const getUsingJoinService = async (params) => {
  try {
    
    // let result = await studentProfile.findOne({
    //   where:{profileId:params.profileId},
    //   include :[{
    //     model: studentFeestruture,
    //     as : "studentFeeDetails"
    //   }]
    // })

     let result = await studentFeestruture.findOne({
      where:{studentId:params.studentId},
      include :[{
        model: studentProfile,
        as : "studentDetails"
      }]
    })

    if (result) {
      return {
        statusCode: 200,
        status: true,
        message: "sended",
        data:result,
      };
    } else {
      return {
        statusCode: 400,
        status: true,
        message: "error",
        data: {},
      };
    }
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 400,
      status: false,
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
  restPasswordService,
  forgetPasswordService,
  changePasswordService,
  bulkCreateService,
  PDFformatService,
  getUsingJoinService,
};
