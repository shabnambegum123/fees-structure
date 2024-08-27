const router = require("express").Router();
const { verifyToken, verifyRole } = require("../middleWare/Authentication");
const {studentLogin,studentCreate,updateStudent,liststudentId,deleteId,staffCreate,updateStaff,staffId,deleteStaff,loginStaff,tokenValidationStudent,tokenValidationStaff,createFee,updateFee,getfeeId,deletefee} = require("../middleWare/validation")
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
router.post("/create/Profile", [verifyToken], [studentCreate], createUser);

router.post("/login/user",[studentLogin],loginUser)
router.put("/update/user",[verifyToken , verifyRole],[updateStudent],updateUser)
router.get("/student/list", [verifyToken], listUser);
router.get("/byId", [verifyToken], getById)
router.delete("/delete/user", [verifyToken], deleteUser)
router.get("/token/check",[verifyToken], verifyUser)
;
// fees structure
router.post("/create/feestructure",[verifyToken],[createFee], createFeestructure)
router.put("/update/user",[verifyToken], updateFeestructure)
router.get("/list/fee",[verifyToken], listFeestructure)
router.get("/byId",[getfeeId],[verifyToken], getByIdFeestructure)
router.delete("/delete",[deletefee],[verifyToken], deleteFeestructure)
router.get('/send/management',[verifyToken],managementMail)

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
router.put("/update/staffee", updatestaff);
router.get("/getId/staffee", [verifyToken, verifyRole],[staffId], getByIdstaff);
router.get("/list/staffee", liststaff);
router.delete("/delete/staffee", [verifyToken, verifyRole],[deleteStaff], deletestaff);
router.post("/login/staff", loginstaff)
router.get("/verify/token",  verifystaffToken)
router.get("/payment/mail",mailsend)


module.exports = router
