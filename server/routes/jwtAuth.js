const { hash } = require("bcrypt");
const { Router } = require("express");
const router = Router();
const pool = require("../../db");
require("dotenv").config();

router.post("/register", async (req, res, next) => {
	try {
		const { user_id, user_email, user_password, user_name } = req.body;
		//1 check if user exist (if so , throw error)
		try {
			const user = await pool.query(
				"SELECT * FROM users WHERE user_email = $1",
				[user_email]
			);
			if (user) {
				res
					.status(402)
					.json("user_id already exist in the database, please try to login.");
			}

			//2 if not exist bcrypt the user password
		} catch (error) {
			console.error(error);
			res.status(500).json("Server cannot reach the DB");
		}

		//3 insert new user to db
		//4 generate jwt token
	} catch (error) {
		console.error(err.message);
		res.status(500).send("Sorry, Server Errors");
	}
});

module.exports = router;
