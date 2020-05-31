const helmet = require('helmet');
const home = require('./routes/home');
const char = require('./routes/chars');
const express = require('express');
const path = require('path');
const db = require('./db');

const main = async () => {
  const app = express();

  // Database configuration
  const connection = await db.connect();
  const models = db.load(connection);
  db.register(app, connection, models);

  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(helmet());
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  //Routes
  app.use('/', home);
  app.use('/api/chars', char);

  //Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
  });

  //Listening
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  const server = app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
};

main();
