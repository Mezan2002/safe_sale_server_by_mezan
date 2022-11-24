// requires start
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// requires end

// middlewears start
app.use(cors());
app.use(express.json());
// middlewears end

// express initial setup start

// default page API start
app.get("/", (req, res) => {
  res.send("Safe Sale Server is Running Hurrah!");
});
// default page API end

// listen the server API start
app.listen(port, () => {
  console.log(`Safe Sale Server is Running on ${port}`);
});
// listen the server API end

// express initial setup end
