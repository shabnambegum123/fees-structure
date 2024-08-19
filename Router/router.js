const router = require("express").Router();

const {
  createUser,
  updateUser,
  listUser,
  getById,
  deleteUser,
  loginUser,
  verifyUser
} = require("../Controller/studentProfile");

const {
  createFeestructure,
  updateFeestructure,
  deleteFeestructure,
  getByIdFeestructure,
  listFeestructure,
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
  verifystaffToken
} = require("../Controller/staffprofile")


// student profile
router.post("/create/Profile", createUser);
router.post("/login/user", loginUser);
router.put("/update/user", updateUser);
router.get("/list", listUser);
router.get("/byId", getById);
router.delete("/delete", deleteUser);
router.get("/token/check",verifyUser)

// fees structure
router.post("/create/feestructure", createFeestructure);
router.put("/update/user", updateFeestructure);
router.get("/list/fee", listFeestructure);
router.get("/byId", getByIdFeestructure);
router.delete("/delete", deleteFeestructure);

// studentFeeStructure
router.post("/create/studentfee", createstudentFee);
router.put("/update/studentfee", updatestudentFee);
router.get("/getId/studentfee", getByIdstudentFee);
router.get("/list/studentfee", liststudentfee);
router.delete("/delete/studentfee", deletestudentFee);


// staff profile 
router.post("/create/staffee", createstaff);
router.put("/update/staffee",updatestaff);
router.get("/getId/staffee", getByIdstaff);
router.get("/list/staffee", liststaff);
router.delete("/delete/staffee",  deletestaff);
router.post("/login/staff",loginstaff)
router.get ("/verify/token",verifystaffToken)

module.exports = router;
