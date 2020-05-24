const models = require('./models');

const load = db => {
  const compiledModels = {};

  for (let name in models) {
    compiledModels[name] = db.model(name, models[name]);
  }

  console.log('[MongoDB] Models compiled');
  return compiledModels;
};

module.exports = load;
