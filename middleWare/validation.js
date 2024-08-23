const joi = require("joi");
// student profile
const studentCreate = async (req, res) => {
  var param = req.body;
  let input = {
    Name: joi.string().required(),
    EmailId: joi.string().email().min(15).max(56).required(),
    password: joi.string().required().min(6).max(10),
    Role: joi.string().default("Student").required(),
    Designation: joi.string().required(),
    is_FirstGraduate: joi.string().required().default("true", "false"),
    category: joi.string().required().default("BC", "general"),
    currentYear: joi.string().require(),
    feestructureId: joi.number().required(),
    mobileNumber: joi.number().min(10).max(10).required(),
  }
}

const studentLogin = async () => {
  EmailId = await joi.string().email().min(15).max(56).required();
  password = await joi.string().required().min(6).max(10);
};

const updateStudent = async () => {
  EmailId = await joi.string().email().min(15).max(56);
  password = await joi.string().min(6).max(10);
  Role = await joi.string().default("Student");
  Designation = await joi.string();
  is_FirstGraduate = await joi.string().default("true", "false");
  category = await joi.string().default("BC", "general");
  currentYear = await joi.string();
  feestructureId = await joi.number();
  mobileNumber = await joi.number().min(10).max(10);
};

const studentId = async () => {
  profileId = await joi.number().required();
};

const deleteId = async () => {
  is_deleted = await joi.boolean().required();
};
const tokenValidationStudent = async () => {
  token = joi
    .string()
    .regex(/^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_.+/=]*$/);
};

// staff profile

const staffCreate = async () => {
  Name = await joi.string().required();
  EmailId = await joi.string().email().min(15).max(56).required();
  password = await joi.string().min(6).max(10).required();
  Role = await joi.string().default("staff").required();
  Designation = await joi.string().required();
};

const updateStaff = async () => {
  Name = await joi.string();
  EmailId = await joi.string().email().min(15).max(56);
  password = await joi.string().min(6).max(10);
  Role = await joi.string().default("staff");
  Designation = await joi.string();
};
const staffId = async () => {
  staffId = await joi.number().required();
};

const deleteStaff = async () => {
  is_deleted = await joi.boolean().required();
};

const loginStaff = async () => {
  EmailId = await joi.string().email().min(15).max(56).required();
  password = await joi.string().required().min(6).max(10);
};

const tokenValidationStaff = async () => {
  token = joi
    .string()
    .regex(/^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_.+/=]*$/);
}

// fee structure

const createFee = async () => {
  (Designation = await joi.string().required()(
    (year = await joi.string().require())
  )),
    (TuitionFee = joi.number().required()),
    (BookFee = joi.number().required()),
    (BusFee = joi.number().required()),
    (FirstGraduate_discount = joi.number().required()),
    (Reserved_students_Discount = joi.number().required());
}

const updateFee = async () => {
  (Designation = await joi.string()((year = await joi.string()))),
    (TuitionFee = joi.number()),
    (BookFee = joi.number()),
    (BusFee = joi.number()),
    (FirstGraduate_discount = joi.number()),
    (Reserved_students_Discount = joi.number());
}

const getfeeId = async () => {
  feestructureId = await joi.number().required();
}

const deletefee = async () => {
  is_deleted = await joi.boolean().required();
}

module.exports = {
  studentLogin,
  studentCreate,
  updateStudent,
  studentId,
  deleteId,
  staffCreate,
  updateStaff,
  staffId,
  deleteStaff,
  loginStaff,
  tokenValidationStaff,
  tokenValidationStudent,
  createFee,
  updateFee,
  getfeeId,
  deletefee,
};
