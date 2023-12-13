const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://king001:KINGkite001@user-details-new.au4ou4u.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

  
// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String },
  skills: { type: String, },
  registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword, university, skills } = req.body;

  // Validate user input (password match, etc.)

  // Hash password before storing

  const newUser = new User({
    name,
    email,
    password, // Hashed password
    university,
    skills,
  });

  try {
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
