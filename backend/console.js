require('dotenv').config()
const fs = require('fs');
const path = require('path');
const repl = require('repl')

const modelDir = path.join(__dirname, 'src', 'models');

const loadModels = (context) => {
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key];
  });
  fs.readdirSync(modelDir, 'utf8').forEach(name => {
    const filePath = path.join(modelDir, name);
    console.log('name:', name);
    context[name] = require(filePath);
  });
  const mongoose = require('mongoose');
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${MONGO_CONNECT}`);
}
const replServer = repl.start('>>>');
loadModels(replServer.context);
replServer.defineCommand('re', {
  help: 'Reload the models without resetting the environment',
  action() {
    loadModels(replServer.context);
    this.displayPrompt();
  },
});