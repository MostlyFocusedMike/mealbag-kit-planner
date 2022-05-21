require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const app = express();

console.log('process.env:', process.env.MONGO_PW);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PW}@cluster0.hqyzi.mongodb.net/fillingInThTheBlanks?retryWrites=true&w=majority`);

// set up static files router
const options = {
    setHeaders: (res, path, stat) => { // eslint-disable-line no-shadow
        res.set('x-timestamp', Date.now());
    },
};
const staticFiles = express.static(path.join(__dirname, '..', 'build'), options);
app.use(staticFiles);
app.get('/menus', async (req, res) => {
  const menus = await Menu.findAll()
  res.json({ menus })
})

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', async () => {
    console.log(`Example app listening on port 'http://localhost:${port}`);
});
