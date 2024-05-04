const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./src/Config/userDB");

const port = process.env.PORT;
const user = require("./src/Routes/userRoutes");

app.use(express.json());
app.use("/", user);

app.listen(port, () => console.log("listen......."));
