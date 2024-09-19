const router = require("express").Router();

const multer = require("multer")
const {upload} = require("../Multer/multer")
const { verifyToken, verifyRole } = require("../middleWare/Authentication");

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
  changePasswordValidity,
  DeleteFeeQuery
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
  PDFformat,
  getUsingJoin,
 
} = require("../Controller/studentProfile");

const {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail,
  downloadSheet,
  axiosUrl
} = require("../Controller/feestructure");

const {
  createstudentFee,
  updatestudentFee,
  getByIdstudentFee,
  liststudentfee,
  deletestudentFee,
  fetchData
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
  updatePaidFees,
  cryptoModule
} = require("../Controller/staffProfile");
// student profile

router.post("/bulk/Create", upload.single('file'),bulkCreate)
router.post("/create/Profile",[studentCreate], createUser);//done
router.post("/login/user",[studentLogin], loginUser);// done
router.put("/update/user", [verifyToken,verifyRole("Student")], updateUser);//done
router.get("/student/list", [verifyToken,verifyRole("Student")], listUser)// done,error
router.get("/byId", [verifyToken, verifyRole(["Student"])], getById)//done
router.delete("/delete/user", [verifyToken,verifyRole("Student")], deleteUser);//done
router.get("/email/studentFee", [verifyToken,verifyRole("Student")], verifyUser);//done 
router.put("/reset/password", [verifyToken,verifyRole("Student"),validatePassword], restPassword);
router.post("/forget/password",[forgetPasswordValidity], forgetPassword);//done
router.put("/change/password", [verifyToken,verifyRole(["Staff","Student"]),changePasswordValidity], changePassword)// done
router.get("/PDF/email", [verifyToken,verifyRole(["Staff","Student"])],PDFformat)// done
router.get ("/join/get",getUsingJoin) // done

// fees structure
router.post(
  "/create/feestructure",
  [createFee],
  createFeestructure
); // done
router.put("/update/feestructure", [verifyToken,verifyRole("Staff"),updateFee],  updateFeestructure); // done
router.get("/list/feestructure", [verifyToken,verifyRole(["Staff","Student"]),listById],  listFeestructure); // done
router.get("/byId/feestructure", [verifyToken,verifyRole("Staff")], [getByIdFee], getByIdFeestructure); //done
router.delete("/delete/feestructure", [verifyToken,verifyRole("Staff"),DeleteFeeQuery], deleteFeestructure);//done
router.get("/send/management", managementMail);// error
router.get("/downloading/sheet",downloadSheet)// done
router.post("/axios/url",axiosUrl)

// studentFeeStructure
router.post("/create/studentfee", [verifyToken,verifyRole("Staff")], createstudentFee);// not created using this api
router.put("/update/studentfee",[verifyToken,verifyRole("Staff"),updateFeestructureValidation],updatestudentFee);// done
router.get("/getId/studentfee/:studentFeestrutureId", [verifyToken,verifyRole("Staff")], getByIdstudentFee);// done
router.get("/list/studentfee", [verifyToken,verifyRole("Staff"),listByIdFee], liststudentfee);// done
router.delete("/delete/studentfee", [verifyToken,verifyRole("Staff")], deletestudentFee);// done
router.get("/fetchData/axios",fetchData)

// staff profile
router.post("/create/staff",[staffCreate], createstaff);// done
router.put("/update/staff", [verifyToken,verifyRole("Staff"),updateStaff], updatestaff);// done
router.get("/getId/staff", [verifyToken,verifyRole("Staff")], getByIdstaff);// done
router.get("/list/staff", [verifyToken,verifyRole("Staff"),listId], liststaff);// done
router.delete("/delete/staff",[verifyToken,verifyRole("Staff")], deletestaff)// done
router.post("/login/staff", [loginStaff], loginstaff);//done
router.get("/verify/token", [verifyToken,verifyRole("Staff")], verifystaffToken)
router.get("/payment/mail", [verifyToken,verifyRole("Staff")], mailsend)// done 
router.put("/update/Fine", [verifyToken,verifyRole("Staff")],updatePaidFees)// done
router.post("/crypto/module",[verifyToken,verifyRole("Staff")],cryptoModule)//done
module.exports = router

