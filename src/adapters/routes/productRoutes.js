const express = require('express');
const { Router } = require('express');
const { verifyToken, isAdmin } = require('../middlewares/authJwt'); 

module.exports = (productController) => {
  const router = Router(); // Instancia el router


  router.get('/', (req, res) => productController.getAll(req, res));

  router.post('/', [verifyToken, isAdmin], (req, res) => productController.create(req, res));

  router.get('/:idproducto', (req, res) => productController.getById(req, res)); 


  return router;
};