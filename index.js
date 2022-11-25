// requires start
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// requires end

// middlewears start
app.use(cors());
app.use(express.json());
// middlewears end

// express initial setup start

// MongoDB connect API start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// collections making start

const categoriesCollection = client.db("safeSale").collection("categories");
const productsCollection = client.db("safeSale").collection("products");
const usersCollection = client.db("safeSale").collection("users");

// collections making end

// CRUD's run function start
const run = async () => {
  try {
    // get all categories API start
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
    });
    // get all categories API end

    // get signle category product API start
    app.get("/categories/:name", async (req, res) => {
      const name = req.params.name;
      const query = { categoryName: name };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });
    // get signle category product API end

    // create users collection API start
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // create users collection API end

    // get all users API start
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });
    // get all users API end

    // get all sellers API start
    app.get("/users/seller", async (req, res) => {
      const query = { role: "Seller" };
      const sellers = await usersCollection.find(query).toArray();
      res.send(sellers);
    });
    // get all sellers API end
  } finally {
    // console.log();
  }
};
run().catch((err) => console.error(err));
// CRUD's run function end

// MongoDB connect API end

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
