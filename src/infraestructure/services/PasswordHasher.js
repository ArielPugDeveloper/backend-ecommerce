const bcrypt = require('bcryptjs');
 
class PasswordHasher {
  async compare(plain, hash) {
    return bcrypt.compare(plain, hash);
  }
  async hash(plain) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  }
}
 
module.exports = PasswordHasher;