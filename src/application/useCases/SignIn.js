class SignIn {
  constructor(userRepository, passwordHasher, tokenGenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }

  async execute({ username, password }) {
    console.log('SignIn Use Case - Attempting sign in for username:', username);

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      console.log('SignIn Use Case - User not found for username:', username);
      throw new Error('User not found');
    }

    console.log('SignIn Use Case - User found:', user.username);
    console.log('Password received (from Postman):', password, 'Type:', typeof password);
    console.log('User password from DB (user.password):', user.password, 'Type:', typeof user.password);
    console.log('--------------------------------------');


    const isValid = await this.passwordHasher.compare(password, user.password); 
    if (!isValid) {
      console.log('SignIn Use Case - Invalid password for user:', user.username);
      throw new Error('Invalid password');
    }

    console.log('SignIn Use Case - Password valid for user:', user.username);

    const accessToken = this.tokenGenerator.generateAccessToken({ id: user._id, roles: user.roles });
    const refreshToken = this.tokenGenerator.generateRefreshToken({ id: user._id });

    return { user, accessToken, refreshToken };
  }
}

module.exports = SignIn;