const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const complaintRouter = require("./routes/complaints");
const dashRouter = require("./routes/dashboard");
const port = process.env.PORT || 3001;
const jwt = require("jsonwebtoken");
dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "No Token Access Denied" });
  }
  try {
    //token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .send({ auth: false, message: `Invalid Token ${token} ${err}` });
  }
  return next();
};

app.use("/api/users/", verifyToken, userRouter);
app.use("/auth/", authRouter);
app.use("/api/complaints/", complaintRouter);
app.use("/api/dashboard/", dashRouter);

app.listen(port, () => {
  console.log(`Node Server is Listening on port ${port}`);
});
