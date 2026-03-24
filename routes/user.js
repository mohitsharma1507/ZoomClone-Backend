const {
  Register,
  Login,
  addToHistory,
  getUserHistory,
  verifyOtp,
  resendOTP,
  resetPassword,
  forgotPassword,
  verifyForgotPasswordOTP,
} = require("../controllers/user");
const router = require("express").Router();

router.post("/register", Register);
// router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOTP);
router.post("/login", Login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOTP);
router.post("/reset-password", resetPassword);
router.get("/user/get_all_activity", getUserHistory);
router.post("/user/add_to_activity", addToHistory);

module.exports = router;
