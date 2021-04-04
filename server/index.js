const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config({ debug: process.env.PORT });
// const jwt = require("jsonwebtoken");

const authRouter = require("./routes/jwtAuth");

const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors());

//Routes

//Register and Login Routes
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
