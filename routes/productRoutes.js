import express from 'express';
import { addProduct, updateProductStock, replenishStock, getPerformanceReport } from '../controllers/productController.js';

const router = express.Router();

// Add a new product
router.post('/', addProduct);

// Update product stock
router.put('/:sku/stock', updateProductStock);

// Replenish product stock
router.put('/:sku/replenish', replenishStock);

// Get performance report
router.get('/performance', getPerformanceReport);

export default router;
