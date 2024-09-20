import Product from '../models/product.js';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update product stock and trigger replenishment alert
export const updateProductStock = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update stock
    product.currentStock = req.body.currentStock || product.currentStock;

    // Check if stock broke the minimum threshold
    if (product.currentStock <= process.env.MIN_INVENTORY_THRESHOLD) {
      product.minStockBreaks += 1;
      await product.save();

      return res.json({
        product,
        alert: `Stock is below the minimum level. Replenish to ${product.maxStock}.`,
      });
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Replenish product stock to maxStock
export const replenishStock = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.currentStock = product.maxStock;
    await product.save();
    res.json({ message: `Stock replenished to ${product.maxStock} units`, product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get product performance report (with enhanced logic)
export const getPerformanceReport = async (req, res) => {
  try {
    const products = await Product.find({});
    const today = new Date();
    const highFrequency = [];
    const lowPriority = [];

    products.forEach(product => {
      const daysOnShelf = (today - product.createdAt) / (1000 * 60 * 60 * 24); // Convert ms to days

      if (daysOnShelf > 60 && product.minStockBreaks < 3) {
        // If the product breaks the min threshold < 3 times in 60 days, consider it low-priority
        lowPriority.push({
          sku: product.sku,
          daysOnShelf,
          minStockBreaks: product.minStockBreaks,
          suggestion: 'Low-priority item. Consider reducing stock.',
        });
      } else if (product.minStockBreaks >= 3) {
        // If the product breaks the min threshold >= 3 times in 60 days, consider it high-frequency
        highFrequency.push({
          sku: product.sku,
          minStockBreaks: product.minStockBreaks,
          suggestion: 'High-frequency item. Prioritize restocking.',
        });
      }
    });

    res.json({ highFrequency, lowPriority });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
