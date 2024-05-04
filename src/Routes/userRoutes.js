const express = require("express");
const router = express.Router();

const { getUsers, addUser, login } = require("../Controllers/userControll");

router.get("/", getUsers)
.post("/signup", addUser)
.post("/login", login);

module.exports = router;
