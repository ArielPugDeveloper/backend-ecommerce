class AuthController {
  constructor(signInUseCase) {
    this.signInUseCase = signInUseCase;
  }
 
  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, token } = await this.signInUseCase.execute({ username, password });
      delete user.password;
      res.json({ user, token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}
 
module.exports = AuthController;