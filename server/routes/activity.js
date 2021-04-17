const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/create", authorization, async (req, res, next) => {
	const { description, amount, activity_owner_id } = req.body;
	try {
		const newActivity = await pool.query(
			"INSERT INTO activities (description, amount, activity_owner_id) VALUES ($1,$2,$3) RETURNING *",
			[description, amount, activity_owner_id]
		);
		return res.json(newActivity.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
});

//verify owner_id and user_id match before removal
router.delete("/delete", async (req, res, next) => {
	const { activity_id } = req.body;
	try {
		const removeActivity = await pool.query(
			"DELETE FROM activities WHERE activity_id = $1",
			[activity_id]
		);
		return res.json({ msg: "remove activity sucessfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
