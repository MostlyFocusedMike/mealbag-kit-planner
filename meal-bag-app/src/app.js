// this file seems to have to be called app.js for elastic beanstalk, even though there
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Menu = require('./models/Menu');

const app = express();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_CONNECT}`;
mongoose.connect(uri);

const staticFiles = express.static(path.join(__dirname, '..', 'build'));
app.use(staticFiles);
app.use(express.json());

app.get('*', (req, res, next) => {
  console.log('req.originalUrl catch: ', req.originalUrl);
  if (req.originalUrl.includes('/api')) return next();
  return res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/v1/menus', async (req, res) => {
  const menus = await Menu.findAll()
  res.json(menus)
})

app.get('/api/v1/health', async (req, res) => {
  res.json({ msg: 'OK' });
})

app.get('/api/v1/menus/:menuId', async (req, res) => {
  const menu = await Menu.findById(req.params.menuId)
  res.json(menu)
})

app.post('/api/v1/menus', async ({body}, res) => {
  const newMenu = await Menu.createOne(body);
  res.json(newMenu)
})

app.put('/api/v1/menus/:menuId', async ({params, body}, res) => {
  const menu = await Menu.update(params.menuId, body)
  res.json(menu)
})

app.post('/api/v1/menus/:menuId/items', async ({params, body}, res) => {
  const menu = await Menu.addItem(params.menuId, body)
  res.json(menu)
})

const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', async () => {
    console.log(`Example app listening on port 'http://localhost:${port}`);
});
