const conf = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

module.exports = conf;
