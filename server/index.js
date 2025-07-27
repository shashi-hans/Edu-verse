const cors = require("cors");
const express = require("express");
const createError = require("http-errors");
const connectDB = require("./config/db");
const visitorRoutes = require("./routes/visitor");

// Express app
const app = express(); 

app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";
console.log("environment ==========", process.env.NODE_ENV);
console.log("isProduction ==========", isProduction);

const allowedOrigin = isProduction ? "https://educational-verse.netlify.app" : true; // allows localhost in dev

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle preflight (OPTIONS) requests globally
app.options(
  "*",
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect Database
connectDB();
app.use("/api/visitor", visitorRoutes);

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
