const express = require("express");
const cors = require("cors");
require("dotenv").config();
const data = require("./Products.json");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

// Middle Ware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://brand-shop:Z6OwoaxeukeFqTrk@cluster0.rqtbidh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const dataCollection = client.db("Brand_ShopDB").collection("Products");
    const storeCollection = client.db("Brand_ShopDB").collection("storedItem");

    const count = await dataCollection.countDocuments();
    if (count === 0) {
      await dataCollection.insertMany(data);
    }

    // Find All data
    app.get("/products", async (req, res) => {
      const cursor = await dataCollection.find().toArray();
      res.send(cursor);
    });

    // Find Filter data
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { brand: id };
      const cursor = await dataCollection.find(query).toArray();
      res.send(cursor);
    });

    // Find One Data
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dataCollection.findOne(query);
      res.send(result);
    });

    // Post Operation
    app.post("/products", async (req, res) => {
      const product = req.body;
      console.log(req.body);
      const result = await dataCollection.insertOne(product);
      res.send(result);
    });

    // Update Products 
    app.put(`/products/:id`, (req, res)=>{

    })

    // Get all storedItem
    app.get("/storedItem", async (req, res) => {
      const cursor = await storeCollection.find().toArray();
      res.send(cursor);
    });

    // Add item store in database
    app.post("/storedItem", async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await storeCollection.insertOne(item);
      res.send(result);
    });

    // delete Item form storedItem
    app.delete("/storedItem/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: id };
      const result = await storeCollection.deleteOne(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello, This is Shop Server");
});

app.listen(port, () => {
  console.log(`My server is running with port ${port}`);
});
