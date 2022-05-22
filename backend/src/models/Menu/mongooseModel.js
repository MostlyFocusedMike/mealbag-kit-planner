const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  itemsPerBag: Number,
  itemsPerPack: Number,
})

const menuSchema = new mongoose.Schema({
  name: String,
  numberOfPallets: Number,
  items: [itemSchema],
})

// Duplicate the ID field.
menuSchema.virtual('id').get(function(){ return this._id.toHexString(); });
itemSchema.virtual('id').get(function(){ return this._id.toHexString(); });

// Ensure virtual fields are serialised.
menuSchema.set('toJSON', { virtuals: true });
itemSchema.set('toJSON', { virtuals: true });

const menuMongooseModel = mongoose.model('Menu', menuSchema);

module.exports = {
  menuMongooseModel
};
