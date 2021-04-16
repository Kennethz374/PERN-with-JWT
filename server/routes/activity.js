// const router = require("express").Router();
// const pool = require("../db");
// const authorization = require("../middleware/authorization");

// router.post("/create", authorization, async (req, res, next) => {
// 	const { baby_name, baby_gender, baby_birthday, baby_owner_id } = req.body;
// 	try {
// 		const newBaby = await pool.query(
// 			"INSERT INTO babies (baby_name, baby_gender, baby_birthday, baby_owner_id) VALUES ($1,$2,$3,$4) RETURNING *",
// 			[baby_name, baby_gender, baby_birthday, baby_owner_id]
// 		);
// 		return res.json(newBaby.rows[0]);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json("Server Error");
// 	}
// });

// //verify owner_id and user_id match before removal
// router.delete("/delete", authorization, async (req, res, next) => {
// 	const { baby_id } = req.body;
// 	try {
// 		const removeBaby = await pool.query(
// 			"DELETE FROM babies WHERE baby_id = $1",
// 			[baby_id]
// 		);
// 		return res.json({ msg: "remove baby sucessfully" });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json("Server Error");
// 	}
// });

// module.exports = router;
