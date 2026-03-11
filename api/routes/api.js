const express = require('express');
const router = express.Router();
const { storesController, productsController, ordersController, authController } = require('../controllers/controller');

router.get('/stores', storesController.getAll);
router.get('/stores/:id', storesController.getById);

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.delete);

router.get('/orders', ordersController.getAll);
router.get('/orders/:id', ordersController.getById);
router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.update);

router.post('/auth/login', authController.login);

module.exports = router;
