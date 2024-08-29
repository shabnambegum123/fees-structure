const router = require("express").Router();
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
  verifyRoleFee
} = require("../middleWare/validation");
const {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser,
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
router.post("/create/Profile", [verifyToken], [studentCreate], createUser);

router.post("/login/user", [studentLogin], loginUser);
router.put(
  "/update/user",
  [verifyToken, verifyRole],
  [updateStudent],
  updateUser
);
router.get("/student/list", [verifyToken], [liststudentId], listUser);
router.get("/byId", [verifyToken], getById);
router.delete("/delete/user", [verifyToken], deleteUser);
router.get("/token/check", [verifyToken], verifyUser);
// fees structure
router.post(
  "/create/feestructure",
  [verifyToken],
  [createFee],
  createFeestructure
);
router.put("/update/user", [verifyToken], [updateFee], updateFeestructure);
router.get("/list/fee", [verifyToken], [listById], listFeestructure);
router.get("/byId", [verifyToken], getByIdFeestructure);
router.delete("/delete", [verifyToken], deleteFeestructure);
router.get("/send/management", [verifyToken], managementMail);

// studentFeeStructure


  router.post(
    "/create/studentfee",
    [verifyToken, verifyRole],
    createstudentFee
  )
router.put(
  "/update/studentfee",
  [verifyToken],
  [updateFeestructureValidation],
  updatestudentFee
);
router.get("/getId/studentfee", [verifyToken], getByIdstudentFee);
router.get("/list/studentfee", [verifyToken], [listByIdFee], liststudentfee);
router.delete("/delete/studentfee", [verifyToken], deletestudentFee);

// staff profile
router.post("/create/staffee", [verifyToken], [staffCreate], createstaff);
router.put("/update/staffee", [verifyToken], [updateStaff], updatestaff);
router.get("/getId/staffee", [verifyToken], getByIdstaff);
router.get("/list/staffee", [verifyToken], [listId], liststaff);
router.delete("/delete/staffee", [verifyToken], deletestaff);
router.post("/login/staff", [loginStaff], loginstaff);
router.get("/verify/token", [verifyToken], verifystaffToken)
router.get("/payment/mail", [verifyToken], mailsend);

module.exports = router;
