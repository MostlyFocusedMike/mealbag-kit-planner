require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const app = express();

console.log('process.env:', process.env.MONGO_PW);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PW}@cluster0.hqyzi.mongodb.net/fillingInThTheBlanks?retryWrites=true&w=majority`);

const staticFiles = express.static(path.join(__dirname, '..', 'build'));
app.use(staticFiles);
app.use(express.json());

app.get('/api/v1/menus', async (req, res) => {
  const menus = await Menu.findAll()
  res.json(menus)
})

app.post('/api/v1/menus', async ({body}, res) => {
  const newMenu = await Menu.createOne(body);
  res.json(newMenu)
})

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', async () => {
    console.log(`Example app listening on port 'http://localhost:${port}`);
});
