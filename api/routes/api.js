const express = require('express');
const router = express.Router();
const { storesController, productsController, ordersController, authController, servicesController, providersController, bookingsController } = require('../controllers/controller');

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

router.get('/services', servicesController.getAll);
router.get('/services/:id', servicesController.getById);

router.get('/providers', providersController.getAll);
router.get('/providers/:id', providersController.getById);

router.get('/bookings', bookingsController.getAll);
router.get('/bookings/:id', bookingsController.getById);
router.post('/bookings', bookingsController.create);
router.put('/bookings/:id', bookingsController.update);

router.post('/auth/login', authController.login);

module.exports = router;
