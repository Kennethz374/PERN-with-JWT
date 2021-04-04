const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const PORT = 5000;

//middlewares
app.use(express.json());
app.use(cors());

//Routes

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
