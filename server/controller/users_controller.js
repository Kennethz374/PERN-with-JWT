const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db");
require("dotenv").config();
const jwtGenerator = require("../utils/jwtGenerator");

//  authentication
const register = async (req, res, next) => {
	const { user_email, user_password, user_name } = req.body;
	try {
		// find user in db
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			user_email,
		]);
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

		let newUser = await pool.query(
			"INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
			[user_name, user_email, hashPassword]
		);

		// generate jwt token
		const token = jwtGenerator(newUser.rows[0].user_id);
		res.json({ token });
	} catch (err) {
		console.log(err, "Could Not Connect to DB and Check User Existence");
	}
};

const login = async (req, res, next) => {
	// destruct req.body
	// check user existence
	//compare incoming password with password in db
	// give jwt token

	const { user_email, user_password } = req.body;

	try {
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			user_email,
		]);
		if (user.rows.length === 0) {
			// user not exist
			return res.status(401).json("Password or Email is incorrect");
		}
		// if user exist, throw error
		const match = await bcrypt.compare(
			user_password,
			user.rows[0].user_password
		);

		if (match) {
			const token = jwtGenerator(user.rows[0].user_id);
			console.log(user.rows[0].user_id, "Generate token");
			return res.json({ jwt: token, user_id: user.rows[0].user_id });
		} else {
			return res.status(401).json("Incorrect password, please try again");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
};

const verify = async (req, res, next) => {
	try {
		res.json(true); //if it pass authorization, return true
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
};

module.exports = { register, login, verify };
