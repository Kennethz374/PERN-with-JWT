const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res, next) => {
	try {
		const user = await pool.query(
			"SELECT user_name, baby_name, baby_gender, baby_birthday, baby_id, user_id FROM babies INNER JOIN users ON baby_owner_id = user_id WHERE user_id = $1",
			[req.user_id]
		);
		return res.json(user.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
