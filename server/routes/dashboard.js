const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res, next) => {
	try {
		const babies = await pool.query(
			"SELECT baby_name, baby_gender, baby_birthday, user_name, baby_id FROM babies INNER JOIN users ON user_id = baby_owner_id WHERE user_id = $1",
			[req.user_id]
		);
		const users = await pool.query(
			"SELECT baby_name, baby_gender, baby_birthday, user_id, user_name, baby_id, activity_id, description, amount, time FROM babies INNER JOIN users ON user_id = baby_owner_id INNER JOIN activities ON baby_id = activity_owner_id WHERE user_id = $1",
			[req.user_id]
		);

		return res.json({ babies: babies.rows, babyActivities: users.rows });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
