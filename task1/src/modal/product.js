const mongoose = require('mongoose');
const schema = mongoose.Schema;

const products = new schema({
  sku: {
    type: Number,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
  },
  upc: {
    type: String,
  },
  category: [
    { 
      id: {
        type: String,
      },
      name: {
        type: String,
      }
    }
  ],
  shipping: {
    type: Number,
  },
  description: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  model: {
    type: String,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  }
});
products.set('timestamps', true);
products.index({ name: 1 });
module.exports = mongoose.model('products', products);
