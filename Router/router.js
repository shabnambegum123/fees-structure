const router = require("express").Router();
const swaggerJsdoc = require("../Util/swagger")
/**
 * @swagger
//  * /api/profile
//  * get:
//  * summary:Fetch user profile details
//  * description:fetch profile details of a user
//  * tags :
//  *      profile
//  * response :
//  *   '200':
//  * description : User profile fetched successfully
//  * '400':
//  * description:Unable to fetch user profile data
//  */
router.get("/student/list",(req,res)=>{
  const demoUser = {
    name:"hii",
    email:"hii123@gmail.com"
  }
  res.status(200).json(demoUser)
})
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
  PDFformat,
  getUsingJoin
} = require("../Controller/studentProfile");

const {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail,
  downloadSheet
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
  updatePaidFees
} = require("../Controller/staffprofile");
const swaggerJSDoc = require("swagger-jsdoc");

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
router.post("/create/Profile", createUser);//done
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
router.get ("/join/get",getUsingJoin)



// fees structure

router.post(
  "/create/feestructure",
  [createFee],
  createFeestructure
); // done
router.put("/update/feestructure", [verifyToken,verifyRole("Staff"),updateFee,updateFeeQuery],  updateFeestructure); // done
router.get("/list/feestructure", [verifyToken,verifyRole(["Staff","Student"])], [listById], listFeestructure); // done
router.get("/byId/feestructure", [verifyToken,verifyRole("Staff")], [getByIdFee], getByIdFeestructure); //done
router.delete("/delete/feestructure", [verifyToken],verifyRole("Staff"),[DeleteFeeQuery], deleteFeestructure);//done
router.get("/send/management", [verifyToken,verifyRole("Staff")], managementMail);// error
router.get("/downloading/sheet",downloadSheet)

// studentFeeStructure
router.post("/create/studentfee", [verifyToken,verifyRole("Staff")], createstudentFee);// not created using this api
router.put(
  "/update/studentfee",
  [verifyToken,verifyRole("Staff")], [updateFeestructureValidation],[updateFeestructureQuery],updatestudentFee);// done
router.get("/getId/studentfee", [verifyToken,verifyRole("Staff")],[getByIdstudentFeeQuery], getByIdstudentFee);// done
router.get("/list/studentfee", [verifyToken,verifyRole("Staff")], [listByIdFee], liststudentfee);// done
router.delete("/delete/studentfee", [verifyToken,verifyRole("Staff")],[updateFeestructureQuery], deletestudentFee);// done
router.get("/fetchData/axios",fetchData)

// staff profile
router.post("/create/staff",[staffCreate], createstaff);// done
router.put("/update/staff", [verifyToken,verifyRole("Staff")], [updateStaff], updatestaff);// done
router.get("/getId/staff", [verifyToken,verifyRole("Staff")], getByIdstaff);// done
router.get("/list/staff", [verifyToken,verifyRole("Staff")], [listId], liststaff);// done
router.delete("/delete/staff",[verifyToken,verifyRole("Staff")], deletestaff)// done
router.post("/login/staff", [loginStaff], loginstaff);//done
router.get("/verify/token", [verifyToken,verifyRole("Staff")], verifystaffToken)
router.get("/payment/mail", [verifyToken,verifyRole("Staff")], mailsend)// done
router.put("/update/Fine", [verifyToken,verifyRole("Staff")],updatePaidFees)// done
module.exports = router

