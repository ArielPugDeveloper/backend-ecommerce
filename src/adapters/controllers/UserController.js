class UserController {
  /**
   * @param {import('../useCases/SignUp')} signUpUseCase
   */
  constructor(signUpUseCase) {
    this.signUpUseCase = signUpUseCase;
  }
 
  async signUp(req, res, next) {
    try {
      const dto = await this.signUpUseCase.execute(req.body);
      res.status(201).json({ user: dto });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
 
module.exports = UserController;