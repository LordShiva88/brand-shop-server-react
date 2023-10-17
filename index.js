const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

//brand-shop
//Z6OwoaxeukeFqTrk


// Middle Ware
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://brand-shop:Z6OwoaxeukeFqTrk@cluster0.rqtbidh.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
  res.send('Hello This is Shop Server')
})

app.listen(port, ()=>{
  console.log(`My server is running with port ${port}`)
})
