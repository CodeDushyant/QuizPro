require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require(
  "./src/sockets/socketHandler"
);

const analyticsRoutes =
require(
"./src/routes/analyticsRoutes"
);



const startCleanupJob =
require(
"./src/cron/cleanupExpiredExams"
);
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const examRoutes = require(
  "./src/routes/examRoutes"
);

const submissionRoutes =
require(
"./src/routes/submissionRoutes"
);
const questionRoutes =
require(
"./src/routes/questionRoutes"
);

const studentRoutes =
require(
"./src/routes/studentRoutes"
);
const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.use(
"/api/student",
studentRoutes
);
app.use(
"/api/analytics",
analyticsRoutes
);
app.use(
  "/api/exam",
  examRoutes
);

app.use(
"/api/submission",
submissionRoutes
);
app.use(
"/api/question",
questionRoutes
);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

socketHandler(io);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "QuizBase Backend Running"
  });
});

const PORT = process.env.PORT || 5000;
startCleanupJob();
server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});