// requires start
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
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
const bookingsCollection = client.db("safeSale").collection("bookings");

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

    // get all buyers API start
    app.get("/users/buyer", async (req, res) => {
      const query = { role: "Buyer" };
      const sellers = await usersCollection.find(query).toArray();
      res.send(sellers);
    });
    // get all buyers API end

    // get all bookings API start
    app.get("/bookings", async (req, res) => {
      const userEmail = req.query.email;
      const query = { userEmail: userEmail };
      const bookigns = await bookingsCollection.find(query).toArray();
      res.send(bookigns);
    });
    // get all bookings API end

    // create all bookings API start
    app.post("/bookings", async (req, res) => {
      const bookings = req.body;
      const result = await bookingsCollection.insertOne(bookings);
      res.send(result);
    });
    // create all bookings API end

    // creating jwt token API start
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "12h",
        });
        return res.send({ accessToken: token });
      }
      res.status(403).send({ message: "forbidden access" });
    });
    // creating jwt token API end
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
