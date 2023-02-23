'use strict';

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionString = 'mongodb://admin:secret@127.0.0.1:27017/admin';

MongoClient.connect(connectionString)
  .then((database) => {
    console.log('Connected');
    database.close();
  })
  .catch((e) => {
    console.log('Failed to connect: ', e.message);
    process.exit(1);
  });

// *create docker image and container*
// docker run - d - p 27017:27017 --name mongo mongo: 4 --auth

// *enter docker shell*
// docker exec - it mongo mongo admin

// *create db and user*
// db.createUser({ user: 'admin', pwd: 'secret', roles: [{role: 'root', db: 'admin'}]});
