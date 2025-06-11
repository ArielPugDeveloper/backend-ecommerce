const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
 
module.exports = (signInUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase);
 
  // POST /api/v1/auth/signin
  router.post('/signin', controller.signIn.bind(controller));
 
  return router;
};