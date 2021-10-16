import express, { Request, Response } from "express";
import { Collection, Db, MongoClient } from "mongodb";

const app = express();
const PORT: number = 3000;
const DB_NAME: string = "learnMongo";
const DB_COLLECTION: string = "playerCharacter";
const URL: string = "mongodb://localhost:27017";

const client = new MongoClient(URL);

let db: Db;
let collection: Collection;
client.connect((err) => {
  if (err) throw err;
  console.log("Connected to mongo server");

  db = client.db(DB_NAME);
  collection = db.collection(DB_COLLECTION);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api", (req: Request, res: Response) => {
  res.send("This is the api endpoint");
});

// CRUD
// =====================================================
app.route(`/api/${DB_COLLECTION}`)

// Create
.post(async (req, res) => {
  let result = await collection.insertOne({
    name: 'canvas',
    qty: 100,
    tags: ['cotton'],
    size: { h: 28, w: 35.5, uom: 'cm' }
  });
  res.send(result);
})

// Read all
.get(async (req, res) => {
  let cursor = collection.find({});
  let documents = await cursor.toArray();
  res.send(documents);
})

// Read

// Update
.put(async (req, res) => {
  let result = await collection.replaceOne({name: 'canvas'}, {name:'gotteem'});
  res.send(result);
})

// Delete
.delete(async (req, res) => {
  let result = await collection.deleteOne({name: 'canvas'});
  res.send(result);
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
