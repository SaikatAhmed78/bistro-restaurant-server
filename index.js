require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1bvy3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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

        // Database Collection
    const menuCollection = client.db("bistro-boss-DB").collection("menu");
    const reviewCollection = client.db("bistro-boss-DB").collection("reviews");

    app.get('/menu', async(req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result)
    });

    app.get('/review', async(req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result)
    });
  

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
 
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('No Problem...Server is Running')
});

app.listen(port, () => {
    console.log(`Bistro Boss Server Running On Port:: ${port}`)
})


