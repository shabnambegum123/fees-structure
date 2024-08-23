const staffprofile = require("../Database/modal/staffprofile");
const bcrypt = require("bcrypt");
const { generatePassword } = require("../password/bcrypt");
const jwt = require("jsonwebtoken");
const { param } = require("../Router/router");
const studentFeestruture = require("../Database/modal/studentFeestruture");
const {generateToken} = require("../token");
const studentProfile = require("../Database/modal/studentprofile");
const { default: axios, all } = require("axios");

const createstaffprofile = async (params) => {
  let info = {
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
  }
  let result = await staffprofile.create(info);
  //staffId = result.max(staffId) + 1
  if (result) {
    return {
      statusCode: 200,
      status: true,
      message: "created",
      data: {},
    };
  } else {
    return {
      status: 400,
      message: " not created",
      data: {},
    };
  }
};
const updatestaffprofile = async (params) => {
  let staffId = params.staffId;
  let result = await staffprofile.update(
    { Name: params.Name },
    { where: { staffId: staffId } }
  );
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
};
const liststaffprofile = async (params) => {
  let staffId = params.staffId;
  let result = await staffprofile.findAll({ where: { staffId: staffId } });

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
      message: "error",
      data: {},
    };
  }
};
const getByIdstaffprofile = async (params) => {
  let staffId = params.staffId;
  let result = await staffprofile.findOne({ where: { staffId: staffId } });
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
};
const deletestaffprofile = async (params) => {
  let staffId = params.staffId;
  let result = await staffprofile.destroy({ where: { staffId: staffId } });
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
};

const loginstaffProfile = async (params) => {
  let EmailId = params.EmailId;
  let password = params.password;
  let result = await staffprofile.findOne({
    where: { EmailId: params.EmailId },
    raw: true,
  });

  if (result) {
    let comparepass = await bcrypt.compare(password, result.password);
    if (comparepass) {
      let generateToken = jwt.sign(result, process.env.secretKey);
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
};

const staffToken = async (param) => {
  let token = param.token;
   let generatetoken = await generateToken(token)
  if (generatetoken.Role === "staff" ) {
   
    var result = await studentFeestruture.findOne({
      where: { studentId: param.studentId },
      raw: true,
    });
    if (result.fineAmount === null) {
      let updatestudentFeeStructure = await studentFeestruture.update(
        { fineAmount: param.fineAmount },
        { where: { studentId: param.studentId } }
      )

      if (updatestudentFeeStructure) {
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
    } else if (result.fineAmount.length > 0) {
      result.fineAmount.push(param.fineAmount);
      var updatestudentFeeStructure = await studentFeestruture.update(
        { fineAmount: result.fineAmount },
        { where: { studentId: param.studentId } }
      );
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
    }
  }
};

const paymentmail = async () =>{
    const result = await studentFeestruture.findOne({where:{paidStatus:'pending'},raw:true})
    if(result){
      const find = await studentProfile.findOne({where:{studentFeestrutureId:result.studentFeestrutureId},raw:true})
      if(find){
       let amount = await result.TotalAmount
        let url = "http://localhost:4000/mail/send";
      let sendData = await axios.post(url,{
         find:find.EmailId,
         result : amount
        })
        console.log('jhqsbxj',sendData)
      return{
        statusCode: 200,
            status: true,
            message: "updated",
            data: find
      }
     }
      return{
        statusCode: 200,
            status: true,
            message: "sended",
            data:{}
      }
    }
    else{
      return {
        statusCode: 400,
        status: true,
        message: "error",
        data: {},
      }
    }
}


module.exports = {
  createstaffprofile,
  updatestaffprofile,
  liststaffprofile,
  getByIdstaffprofile,
  deletestaffprofile,
  loginstaffProfile,
  staffToken,
  paymentmail
};
