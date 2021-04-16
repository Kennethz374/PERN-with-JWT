const router = require("express").Router();
const authorization = require("../middleware/authorization");
const { body, validationResult } = require("express-validator");
const { createBaby, deleteBaby } = require("../controller/babies_controller");

const checkError = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.post(
	"/create",
	authorization,
	body("baby_name")
		.exists()
		.trim()
		.escape()
		.withMessage("Baby name cannot be empty"),
	body("baby_gender")
		.exists()
		.isLength({ min: 4 })
		.trim()
		.escape()
		.withMessage("Gender must be at least 4 character ex Male"),
	body("baby_birthday")
		.isLength({ max: 8 })
		.trim()
		.escape()
		.withMessage("please enter with YYYYMMDD"),
	body("baby_owner_id")
		.exists()
		.trim()
		.escape()
		.withMessage("Baby owner id not correct"),
	checkError,
	createBaby
);

//verify owner_id and user_id match before removal
router.delete("/delete", authorization, deleteBaby);

module.exports = router;
