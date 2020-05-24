const mongoose = require('mongoose');

const getByMode = (prod, dev) =>
  process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ? prod : dev;

const config = {
  host: getByMode(process.env.DB_HOST, process.env.DB_HOST_DEV),
  port: getByMode(process.env.DB_PORT, process.env.DB_PORT_DEV),
  name: getByMode(process.env.DB_NAME, process.env.DB_NAME_DEV),
  username: getByMode(process.env.DB_USER, process.env.DB_USER_DEV),
  password: getByMode(process.env.DB_PASS, process.env.DB_PASS_DEV),
  protocol: getByMode(process.env.DB_PROT, process.env.DB_PROT_DEV),
};

const mongoUrl = `${config.protocol}://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;

const connectionOnSuccessHandler = connection => {
  console.log(`[MongoDB] Connection to ${mongoUrl} created`);
  return connection;
};

const connectionOnErrorHandler = e => {
  console.log(`[MongoDB] Connection to ${mongoUrl} failed with error: ${e}`);
  return Promise.reject(e);
};

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connect = (options = defaultOptions) => {
  return mongoose.createConnection(`${mongoUrl}`, options).then(connectionOnSuccessHandler, connectionOnErrorHandler);
};

module.exports = connect;
