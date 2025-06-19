class AuthController {
  constructor(signInUseCase, tokenGenerator) {
    this.signInUseCase = signInUseCase;
    this.tokenGenerator = tokenGenerator;
  }

  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;

      const { user } = await this.signInUseCase.execute({ username, password });

      // Generar tokens
      const accessToken = this.tokenGenerator.generateAccessToken({
        id: user.id,
        roles: user.roles,
      });

      const refreshToken = this.tokenGenerator.generateRefreshToken({
        id: user.id,
      });

      delete user.password;

      res.json({
        user,
        accessToken,
        refreshToken,
      });

    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

    try {
      const decoded = this.tokenGenerator.verifyRefreshToken(refreshToken);

      const newAccessToken = this.tokenGenerator.generateAccessToken({
        id: decoded.id,
        roles: ['user'], // Consultar roles reales 
      });

      res.json({ accessToken: newAccessToken });

    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
  }
}

module.exports = AuthController;