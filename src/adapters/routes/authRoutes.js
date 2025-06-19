const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const TokenGenerator = require('../../infraestructure/services/TokenGenerator');

module.exports = (signInUseCase) => {
  const router = Router();

  const tokenGenerator = new TokenGenerator();
  const controller = new AuthController(signInUseCase, tokenGenerator);

  // POST /api/v1/auth/signin
  router.post('/signin', controller.signIn.bind(controller));

  // POST /api/v1/auth/refresh
  router.post('/refresh', controller.refreshToken.bind(controller));

  return router;
};



