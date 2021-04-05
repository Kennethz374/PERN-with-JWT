const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	try {
		const token = req.header("token"); //if req.header doesn't have the key name token
		if (!token) {
			return res
				.status(403)
				.json({ msg: "Sorry, you are not authorized to dashboard" });
		}
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user_id = payload.user.id;
		next();
	} catch (error) {
		console.error(error);
		return res.status(403).json("Sorry, you are not authorized");
	}
};
