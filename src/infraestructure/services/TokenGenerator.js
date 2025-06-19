const jwt = require('jsonwebtoken');
const config = require('../../config');

class TokenGenerator {
  generateAccessToken(payload) {
    return jwt.sign(
      { id: payload.id, roles: payload.roles },
      config.jwtSecret,
      { expiresIn: '15m' }
    );
  }

  generateRefreshToken(payload) {
    return jwt.sign(
      { id: payload.id },
      config.refreshSecret,
      { expiresIn: '7d' }
    );
  }

  verifyAccessToken(token) {
    return jwt.verify(token, config.jwtSecret);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, config.refreshSecret);
  }
}

module.exports = TokenGenerator;