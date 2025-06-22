const express = require('express');
const { Router } = require('express');
const { verifyToken, isUser, isAdmin } = require('../middlewares/authJwt'); // Asumo que tienes isUser también, o lo puedes manejar con el userId del token.

module.exports = (orderController) => {
  const router = Router();

  router.post('/', [verifyToken], (req, res) => orderController.createOrder(req, res));

  router.get('/:id', [verifyToken], (req, res) => orderController.getOrderById(req, res));

  router.get('/user/:userId', [verifyToken, isUser], (req, res) => orderController.getUserOrders(req, res));

  router.put('/:id/status', [verifyToken, isAdmin], (req, res) => orderController.updateOrderStatus(req, res));

  return router;
};