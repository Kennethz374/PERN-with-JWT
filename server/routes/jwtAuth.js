const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { register, login, verify } = require("../controller/users_controller");
const authorization = require("../middleware/authorization");

const checkError = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post(
	"/register",

	body("user_email")
		.isEmail()
		.normalizeEmail()
		.withMessage("invalid email, please re-enter a valid email"),
	body("user_name")
		.exists()
		.isLength({ min: 5 })
		.trim()
		.escape()
		.withMessage("User name must be at least 5 characters long"),
	body("user_password")
		.isLength({ min: 10 })
		.trim()
		.escape()
		.withMessage("Password has to be at least 10 characters long"),
	checkError,
	register
);

router.post(
	"/login",
	body("user_email")
		.isEmail()
		.withMessage("invalid email, please re-enter a valid email")
		.normalizeEmail(),
	body("user_password")
		.isLength({ min: 10 })
		.trim()
		.escape()
		.withMessage("Password has to be at least 10 characters long"),
	checkError,
	login
);

router.get("/verify", authorization, verify);

module.exports = router;
