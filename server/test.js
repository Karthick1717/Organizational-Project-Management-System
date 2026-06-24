const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://karthick:karthick@ac-aqzcmql-shard-00-00.bn3vm7i.mongodb.net:27017,ac-aqzcmql-shard-00-01.bn3vm7i.mongodb.net:27017,ac-aqzcmql-shard-00-02.bn3vm7i.mongodb.net:27017/?ssl=true&replicaSet=atlas-puxxrv-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected Successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit();
  });