import express from 'express';
import { SERVER_PORT } from './constants/app.constant.js';
import db from './models/index.cjs';

const { Products, Users } = db;

// await Users.create({ email: 'test', password: 'test', name: 'test' });
// await Products.create({
//   userId: 1,
//   title: 'Product',
//   description: 'testProductDDDD',
//   status: 'SOLD_OUT',
// });

const products = await Products.findAll();
const users = await Users.findAll();

console.log({
  products: products.map((product) => product.toJSON()),
  users: users.map((user) => user.toJSON()),
});

// (2)
// Connecting to a database - Testing the connection
// try {
//   await db.sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const app = express();

// (1)
// app.get('/', (req, res) => {
//   res.send('Hello World!!!!!');
// });

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
