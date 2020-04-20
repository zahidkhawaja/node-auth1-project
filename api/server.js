const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router");
const authenticator = require("../auth/authenticator.js");

const server = express();

const sessionConfig = {
    name: "zahid",
    secret: process.env.SESSION_SECRET || "blahblah",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60 * 5, // 5 min session max
      secure: process.env.USE_SECURE_COOKIES || false, // false for testing, but true in production
      httpOnly: true, // client js cannot access cookies
    },
  };

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "Server running!" });
  });

module.exports = server;
