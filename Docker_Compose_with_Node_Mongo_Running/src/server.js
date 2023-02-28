'use strict';
import express, { json } from 'express';
import { MongoClient } from 'mongodb';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
let client;

async function main() {
  const mongoUri = process.env.MONGO_DB_URI;
  client = new MongoClient(mongoUri);
  await client.connect();
}

main().catch(console.error);

async function createUser(newUser) {
  try {
    const result = await client
      .db('users')
      .collection('users')
      .insertOne(newUser);
  } catch (error) {
    throw new Error(`createUser failed: ${error.message}`);
  }
}

async function findAllUsers() {
  try {
    const result = await client.db('users').collection('users').find();
    return result.toArray();
  } catch (error) {
    throw new Error(`createUser failed: ${error.message}`);
  }
}

const middlewareTest = (req, res, next) => {
  console.log('----------');
  console.log('Middleware');
  console.log('----------');
  next();
};

// App
const app = express();
app.use(express.json());

app.get('/health', middlewareTest, (req, res) => {
  console.log(req.body);
  res.send({ status: 'running' });
});

app.get('/allusers', middlewareTest, async (req, res) => {
  const allUsers = await findAllUsers();
  res.send(allUsers);
});

app.post('/user', middlewareTest, async (req, res) => {
  const body = req.body;
  await createUser(body);
  res.status(201);
});

app.get('*', (req, res) => {
  res.status(404).send({ status: 'not found' });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
