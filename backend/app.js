//external modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const path = require("path");

//local modules
const conf = require("./conf/conf");
const { notFound, errorHandler } = require("./controllers/error");
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("trust proxy", 1); // Trust first proxy for secure cookies


// 1. Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false, // allow serving uploads cross-origin
}));

// 2. CORS (Must be before routes and other strict middlewares to handle OPTIONS)
app.use(
  cors({
    origin: conf.frontendUrl, // "http://localhost:5173"
    credentials: true,
  })
);

// 3. Body Parsers (Must be before sanitizers so req.body exists)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Data Sanitization
// Sanitize in-place to avoid Express "getter only" assignment error on req.query
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.query) mongoSanitize.sanitize(req.query);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});
app.use(hpp());

// 5. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
});
app.use("/api", limiter);

// 6. Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 7. Sessions
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24; // 1 day
const store = new MongoDBStore({
  uri: conf.mongodbUri,
  collection: "sessions",
  expires: SESSION_MAX_AGE,
});

app.use(
  session({
    secret: conf.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: SESSION_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// 8. API Routes
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

// 9. 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Configuration & Database Connection
const PORT = conf.port || 3001;
const DB_PATH = conf.mongodbUri;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
