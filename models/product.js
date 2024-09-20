import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sku: { type: String, unique: true, required: true },
  productName: { type: String, required: true },
  brandName: String,
  currentStock: { type: Number, default: 0 },
  maxStock: { type: Number, required: true, default: 100 },
  minStockBreaks: { type: Number, default: 0 }, // Track how often stock breaks the minimum level
  price: Number,
  strainType: String,
  thcContent: { min: Number, max: Number },
  cbdContent: { min: Number, max: Number },
  shortDescription: String,
  longDescription: String,
  createdAt: { type: Date, default: Date.now },
  lastSaleAt: Date,
  salesHistory: [Date], // Array to track each sale
});

const Product = mongoose.model('Product', productSchema);

export default Product;
