const Users = require("../Models/user");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userControlls = {
  getUsers: async (req, res) => {
    try {
      console.log("current users");
      const users = await Users.find();
      res.status(200).send(users);
      // res.render('home', {users})
    } catch {
      console.log("err");
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const isExists = await Users.findOne({ email });
      console.log(isExists);

      if (isExists) throw new Error("user already exists, try to login");
      const hashedPass = await bcrypt.hash(password, saltRounds);
      const user = new Users({
        name,
        email,
        password: hashedPass,
      });
      console.log(user);
      user.save();
      res.status(201).send("user created");
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const isExists = await Users.findOne({ email });
      console.log(isExists);
      if (!isExists) throw new Error("no user found with this mail id");

      const isCorrectPass = await bcrypt.compare(password, isExists.password);
      if (!isCorrectPass) throw new Error("password not match");

      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send(token);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userControlls;
