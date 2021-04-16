const pool = require("../db");

const createBaby = async (req, res, next) => {
	const { baby_name, baby_gender, baby_birthday, baby_owner_id } = req.body;
	try {
		const newBaby = await pool.query(
			"INSERT INTO babies (baby_name, baby_gender, baby_birthday, baby_owner_id) VALUES ($1,$2,$3,$4) RETURNING *",
			[baby_name, baby_gender, baby_birthday, baby_owner_id]
		);
		console("new baby", newBaby[0]);
		return res.json(newBaby.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
};

const deleteBaby = async (req, res, next) => {
	const { baby_id } = req.body;
	try {
		const removeBaby = await pool.query(
			"DELETE FROM babies WHERE baby_id = $1",
			[baby_id]
		);
		return res.json({ msg: "remove baby sucessfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json("Server Error");
	}
};

module.exports = {
	createBaby,
	deleteBaby,
};
