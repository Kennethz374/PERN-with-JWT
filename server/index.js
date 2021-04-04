const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
// const jwt = require("jsonwebtoken");

const authRouter = require("./routes/jwtAuth");

const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Routes

//Register and Login Routes
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
