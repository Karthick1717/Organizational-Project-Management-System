const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const testRoutes = require("./routes/testRoutes");

const projectRoutes = require("./routes/projectRoutes");

const estimationRoutes =
require("./routes/estimationRoutes");

const teamMemberRoutes =
require("./routes/teammemeberRoutes");

const projectAssignmentRoutes =
require("./routes/projectAssignmentRoutes");

const taskRoutes =
require("./routes/taskRoutes");


const dashboardRoutes =
require("./routes/dashboardRoutes");

const subTaskRoutes =
require("./routes/subTaskRoutes");

const timeLogRoutes =
require("./routes/timeRouts");




dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/estimations",
  estimationRoutes
);

app.use(
  "/api/members",
  teamMemberRoutes
);

app.use(
  "/api/assignments",
  projectAssignmentRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/subtasks",
  subTaskRoutes
);


app.use(
  "/api/timelogs",
  timeLogRoutes
);


app.get("/", (req, res) => {
  res.send("APJ3D Project Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});