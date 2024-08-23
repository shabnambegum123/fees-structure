const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleWare/Authentication");
const {studentLogin,studentCreate,updateStudent,studentId,deleteId,staffCreate,updateStaff,staffId,deleteStaff,loginStaff,tokenValidationStudent,tokenValidationStaff,createFee,updateFee,getfeeId,deletefee} = require("../middleWare/validation")
const {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser,
} = require("../Controller/studentProfile")

const {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
  managementMail
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
  mailsend
} = require("../Controller/staffprofile");

// student profile
router.post(
  "/create/Profile",
  
  createUser
);
router.post("/login/user", loginUser);
router.put("/update/user", [verifyToken, verifyRole],[updateStudent], updateUser);
router.get("/list", [verifyToken, verifyRole], listUser)
router.get("/byId", [verifyToken, verifyRole],[studentId], getById);
router.delete("/delete", [verifyToken, verifyRole],[deleteId], deleteUser);
router.get("/token/check",[tokenValidationStudent], verifyUser);

// fees structure
router.post("/create/feestructure",[createFee], createFeestructure)
router.put("/update/user",[updateFee], updateFeestructure);
router.get("/list/fee", listFeestructure)
router.get("/byId",[getfeeId], getByIdFeestructure)
router.delete("/delete",[deletefee], deleteFeestructure)
router.get('/send/management',managementMail)

// studentFeeStructure
router.post(
  "/create/studentfee",
  [verifyToken, verifyRole],
  createstudentFee
);
router.put(
  "/update/studentfee",
  [verifyToken, verifyRole],
  updatestudentFee
);
router.get(
  "/getId/studentfee",
  [verifyToken, verifyRole],
  getByIdstudentFee
);
router.get(
  "/list/studentfee",
  [verifyToken, verifyRole],
  liststudentfee
);
router.delete(
  "/delete/studentfee",
  [verifyToken, verifyRole],
  deletestudentFee
)

// staff profile
router.post("/create/staffee", [verifyToken, verifyRole],[staffCreate], createstaff);
router.put("/update/staffee", [verifyToken, verifyRole],[updateStaff], updatestaff);
router.get("/getId/staffee", [verifyToken, verifyRole],[staffId], getByIdstaff);
router.get("/list/staffee", [verifyToken, verifyRole], liststaff);
router.delete("/delete/staffee", [verifyToken, verifyRole],[deleteStaff], deletestaff);
router.post("/login/staff", [verifyToken, verifyRole],[loginStaff], loginstaff)
router.get("/verify/token", [verifyToken, verifyRole],[tokenValidationStaff], verifystaffToken)
router.get("/payment/mail",mailsend)


module.exports = router
