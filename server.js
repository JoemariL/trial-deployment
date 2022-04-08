// LIBRARY IMPORTS.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const http = require("http");

// UTIL IMPORTS.
require("dotenv").config();
const auth = require("./middleware/auth");
const connectDB = require("./config/database");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://slu-triage-app.herokuapp.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// ROUTERS.
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");
const userHdfRouter = require("./routes/hdf");
const adminController = require("./controller/admin");
const userController = require("./controller/user");
const visitorRouter = require("./routes/visitor");

app.use("/controller", adminController);
app.use("/controller", userController);
app.use("/visitor", visitorRouter);

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/hdf", userHdfRouter);

// SERVE REACT
const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// DATABASE CONNECTION AND SERVER INITIALIZATION.
const port = process.env.PORT || 8080;
app.set("trust proxy", 1);
const httpServer = http.createServer(app);
connectDB()
  .then(() => {
    httpServer.listen(port, "0.0.0.0", () => {
      console.log("✈  Database connected!");
      console.log(`🚀 server is running on port: ${port}!`);
    });
  })
  .catch(() => {
    console.log("⁉  Failed to connect!");
  });
