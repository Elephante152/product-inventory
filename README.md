# Product Inventory Backend

A backend API for managing a product inventory system that allows adding, updating, searching, and deleting products, along with sorting and filtering the product list. This system includes stock replenishment alerts and performance reports.

## Features

- **Add Products**: Add new products with ID, name, category, price, and quantity.
- **Update Product Information**: Update product details by ID.
- **Search Products**: Retrieve products by name or ID using an efficient search algorithm.
- **Sort Products**: Sort products by name, price, or category.
- **Filter Products**: Filter product lists by criteria like ID.
- **Replenishment Alerts**: Alerts when stock falls below a minimum threshold.
- **Performance Reports**: Get high-frequency and low-priority product reports.

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Elephante152/product-inventory.git

## Navigate to the project directory:
cd product-inventory

## Install Dependencies
npm install

## Create a .env file in the root directory and add the necessary environment variables 
MONGO_URI=<Your MongoDB connection string>
PORT=3000
MIN_INVENTORY_THRESHOLD=10
MAX_INVENTORY_THRESHOLD=100

## Start Dev Server
npm start


## The server will start on the specified port (default: 3000). You can interact with the API using the following routes.

## API Endpoints
POST /products: Add a new product.
PUT /products/:sku/stock: Update product stock.
PUT /products/:sku/replenish: Replenish product stock to maximum.
GET /products/performance: Get product performance report (high-frequency and low-priority items).

## Run Tests
npm test

## Technology Stack
Node.js: JavaScript runtime
Express.js: Web framework for Node.js
MongoDB: NoSQL database for storing product data
Mongoose: MongoDB object modeling tool
Mocha: Test framework
Chai: Assertion library for tests

## License
This project is licensed under the MIT License.



