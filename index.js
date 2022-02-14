const express = require('express');
const cors = require('cors')
const mongoose= require('mongoose');

const app= express();
const apiRouter= require("./Router")
app.use(cors());

app.use(express.json());

app.use("/api",apiRouter);
mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

/**Error middleware */
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: false,
    message: error.message || "Something went wrong.",
  });
});

app.listen(3000,()=>{
  console.log("server star on 3000 port.");
});