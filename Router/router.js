const router = require("express").Router();
const multer = require("multer")
const {upload} = require("../Multer/multer")
const { verifyToken, verifyRole } = require("../middleWare/Authentication");
const {studentCreateQuery,updateFeeQuery,DeleteFeeQuery,updateFeestructureQuery,getByIdstudentFeeQuery}= require("../middleWare/queryValidation")
const {
  studentLogin,
  studentCreate,
  updateStudent,
  liststudentId,
  staffCreate,
  updateStaff,
  listId,
  updateFeestructureValidation,
  loginStaff,
  listByIdFee,
  createFee,
  updateFee,
  listById,
  validatePassword,
  getByIdFee,
  forgetPasswordValidity,
  changePasswordValidity
} = require("../middleWare/validation");
const {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser,
  restPassword,
  forgetPassword,
  changePassword,
  bulkCreate,
  PDFformat
} = require("../Controller/studentProfile");

const {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail,
} = require("../Controller/feestructure");

const {
  createstudentFee,
  updatestudentFee,
  getByIdstudentFee,
  liststudentfee,
  deletestudentFee,
} = require("../Controller/studentFeestruture");

const {
  createstaff,
  updatestaff,
  liststaff,
  getByIdstaff,
  deletestaff,
  loginstaff,
  verifystaffToken,
  mailsend,
} = require("../Controller/staffprofile");

// student profile

// let setStorage = multer.diskStorage({

//   destination: (req, file, cb) => {

//       cb(null,'./Excelsheet')
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname)

//   }
// })

//let upload = multer({ storage: setStorage })
router.post("/bulk/Create", upload.single('file'),bulkCreate)
router.post("/create/Profile", [studentCreate],[studentCreateQuery], createUser);//done

router.post("/login/user",[studentLogin], loginUser);// done
router.put("/update/user", [verifyToken,verifyRole("Student")], [updateStudent], updateUser);//done
router.get("/student/list", [verifyToken,verifyRole("Student")], listUser);// done , [liststudentId]
router.get("/byId", [verifyToken, verifyRole(["Student"])], getById)//done
router.delete("/delete/user", [verifyToken,verifyRole("Student")], deleteUser);//done
router.get("/email/studentFee", [verifyToken,verifyRole("Student")], verifyUser);//done (Email template)
router.put("/reset/password", [verifyToken,verifyRole("Student")], [validatePassword], restPassword);
router.post("/forget/password",[forgetPasswordValidity], forgetPassword);//done
router.put("/change/password", [verifyToken,verifyRole("Student")],[changePasswordValidity], changePassword)// done
router.get("/PDF/email", [verifyToken,verifyRole("Student")],PDFformat)
// fees structure
router.post(
  "/create/feestructure",
  [verifyToken,verifyRole("Staff")],
  [createFee],
  createFeestructure
); // done
router.put("/update/feestructure", [verifyToken,verifyRole("Staff")], [updateFee],[updateFeeQuery], updateFeestructure); // done
router.get("/list/feestructure", [verifyToken,verifyRole("Staff")], [listById], listFeestructure); // done
router.get("/byId/feestructure", [verifyToken,verifyRole("Staff")], [getByIdFee], getByIdFeestructure); //done
router.delete("/delete/feestructure", [verifyToken],verifyRole("Staff"),[DeleteFeeQuery], deleteFeestructure);//done
router.get("/send/management", [verifyToken,verifyRole("Staff")], managementMail);// error

// studentFeeStructure

router.post("/create/studentfee", [verifyToken,verifyRole("Staff")], createstudentFee);// not created using this api
router.put(
  "/update/studentfee",
  [verifyToken,verifyRole("Staff")], [updateFeestructureValidation],[updateFeestructureQuery],updatestudentFee);// done
router.get("/getId/studentfee", [verifyToken,verifyRole("Staff")],[getByIdstudentFeeQuery], getByIdstudentFee);// done
router.get("/list/studentfee", [verifyToken,verifyRole("Staff")], [listByIdFee], liststudentfee);// done
router.delete("/delete/studentfee", [verifyToken,verifyRole("Staff")],[updateFeestructureQuery], deletestudentFee);// done

// staff profile
router.post("/create/staff",[staffCreate], createstaff);// done
router.put("/update/staff", [verifyToken,verifyRole("Staff")], [updateStaff], updatestaff);// done
router.get("/getId/staff", [verifyToken,verifyRole("Staff")], getByIdstaff);// done
router.get("/list/staff", [verifyToken,verifyRole("Staff")], [listId], liststaff);// done
router.delete("/delete/staff",[verifyToken,verifyRole("Staff")], deletestaff)// done
router.post("/login/staff", [loginStaff], loginstaff);//done
router.get("/verify/token", [verifyToken,verifyRole("Staff")], verifystaffToken)
router.get("/payment/mail", [verifyToken,verifyRole("Staff")], mailsend)

module.exports = router

