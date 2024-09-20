import * as chai from 'chai';  // Use named import
import chaiHttp from 'chai-http';  // Import chai-http as usual
import app from '../app.js';
import Product from '../models/product.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Product Inventory Management', () => {
  it('should add a new product', (done) => {
    chai
      .request(app.js)
      .post('/products')
      .send({
        sku: '1234567',
        productName: 'CBD Indica Landrace',
        brandName: 'THC BioMed',
        currentStock: 15,
        maxStock: 100,
        price: 11.5
      })
      .end((_err, res) => {  // Replace 'err' with '_err'
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('sku', '1234567');
        done();
      });
  });

  it('should trigger a replenishment alert when stock is below 10', (done) => {
    chai
      .request(app.js)
      .put('/products/1234567/stock')
      .send({ currentStock: 5 })  // Stock falls below 10
      .end((_err, res) => {  // Replace 'err' with '_err'
        expect(res).to.have.status(200);
        expect(res.body.alert).to.equal('Stock is below the minimum level. Replenish to 100.');
        done();
      });
  });

  it('should replenish stock to maxStock', (done) => {
    chai
      .request(app.js)
      .put('/products/1234567/replenish')
      .end((_err, res) => {  // Replace 'err' with '_err'
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Stock replenished to 100 units');
        done();
      });
  });

  it('should return a performance report', (done) => {
    chai
      .request(app.js)
      .get('/products/performance')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('highFrequency');
        expect(res.body).to.have.property('lowPriority');
        done();
      });
  });
});
