const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../../db");
require("dotenv").config();
const jwtGenerator = require("../utils/jwtGenerator");

router.get("/", async (req, res, next) => {
	try {
		const users = await pool.query("SELECT * FROM users");
		res.json(users.rows.map((row) => row));
	} catch (error) {
		console.log(error);
	}
});

router.post("/register", async (req, res, next) => {
	const { user_email, user_password, user_name } = req.body;
	try {
		// find user in db
		const user = await pool.query(
			"SELECT user_email FROM users WHERE user_email = $1",
			[user_email]
		);
		// if user exist, throw error
		if (user.rows.length > 0) {
			return res
				.status(401)
				.json("user already exist in the database, please try to login.");
		}
		// user not exist, hash the password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(user_password, salt);

		// send info to db
		try {
			let newUser = await pool.query(
				"INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
				[user_name, user_email, hashPassword]
			);
			const token = jwtGenerator(newUser.rows[0].id);

			res.json({ token });
		} catch (err) {
			console.log(err, "Could Not Create New User To The Server");
		}
	} catch (err) {
		console.log(err, "Could Not Connect to DB and Check User Existence");
	}

	//4 generate jwt token
});

module.exports = router;
