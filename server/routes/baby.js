const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const { createBaby, deleteBaby } = require("../controller/babies_controller");

router.post("/create", authorization, createBaby);

//verify owner_id and user_id match before removal
router.delete("/delete", authorization, deleteBaby);

module.exports = router;
