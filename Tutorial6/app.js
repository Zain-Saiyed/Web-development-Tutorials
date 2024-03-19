//  Importing the express library
const express = require('express');
// Instantiate an Express app
const app = express();
// For parsing JSON payloads
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@lab-cluster.q1jchbt.mongodb.net/?retryWrites=true&w=majority&appName=lab-cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("InventoryDB");
const collection = database.collection("inventory");

// [500] Unexpected scenario error handling
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send({
      message: "Oops! Something went wrong. Don't worry its on us.",
      success: false
  });
});

// [ PUT ] - API for inserting multiple Inventory items inside the DB
app.put('/insert', async (request, response) => {
  const itemsToInsert = request.body;
  await collection.insertMany(itemsToInsert);

  console.log("Inserted multiple records.");
  
  response.status(200).json({
    message: "Multiple Inventory items inserted into DB",
    success: true,
  });
});

// [ GET ] - API to return list of all Inventory items present in DB
app.get('/getAllInventoryItems', async (request, response) => {
  const allInventoryItems = await collection.find({}).toArray();

  console.log("All inventory items:", allInventoryItems);
  
  response.status(200).json({
    success: true,
    inventoryItems: allInventoryItems
  });
});

// [ GET ] - API to return a speciifc inventory Item 
app.get('/getAnInventoryItem/:item_id', async (request, response) => {
  const item_id = request.params.item_id;

  const fetchedInventoryItem = await collection.findOne({ id: item_id });

  console.log("Inventory item:", fetchedInventoryItem);

  if (!fetchedInventoryItem) {
    return response.status(404).json({
      message: "Inventory item not present in DB. Please try with a valid item ID.",
      success: false
    });
  }
  response.status(200).json({
    success: true,
    inventoryItem: fetchedInventoryItem
  });
});


// [ POST ] - API for adding new user into the user_base_list and generate a unique ID for that user
app.post('/update/:item_id', async (request, response) => {
  const item_id = request.params.item_id;

  const updatedItem = request.body;

  var updatedRecord = await collection.updateOne({ id: item_id }, { $set: updatedItem });
  console.log("Updated inventory item:", updatedRecord);

  if (updatedRecord.modifiedCount === 0) {
    return response.status(404).json({
      message: "Inventory item not present in DB. Invalid Item ID.",
      success: false
    });
  }
  response.status(200).json({
    message: "Inventory item updated successfully.",
    success: true,
  });
});


// Exporting the Express app instance
module.exports = app;