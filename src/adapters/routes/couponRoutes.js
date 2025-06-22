const express = require('express');
const { Router } = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

module.exports = (couponController) => {
  const router = Router();


  router.post('/', [verifyToken, isAdmin], (req, res) => couponController.createCoupon(req, res));


  router.get('/:code', (req, res) => couponController.getCouponByCode(req, res));


  router.post('/apply', [verifyToken], (req, res) => couponController.applyCoupon(req, res));

  return router;
};