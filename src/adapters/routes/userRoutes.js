const { Router }     = require('express');
const UserController = require('../controllers/UserController');
 
module.exports = (signUpUseCase) => {
  const router = Router();
  const controller = new UserController(signUpUseCase);
 
  // POST /api/v1/users
  router.post('/', controller.signUp.bind(controller));
 
  return router;
};
 