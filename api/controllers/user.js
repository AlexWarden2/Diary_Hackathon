const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require('../models/token');

const register = async (req, res) => {
  try {
    const data = req.body;
    // generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // hash the password
    data['password'] = await bcrypt.hash(data['password'], salt);
    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.getOneByUsername(data.username);

    console.log('User', user);
    const authenticated = await bcrypt.compare(data.password, user['password']);
    console.log('Authentificated:', authenticated);

    if (!authenticated) {
      throw new Error('Incorrect credentials, try again');
    } else {
      const token = await Token.create(user.id);
      res.status(200).json({ authenticated: true, token: token.token });
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);

    const result = await token.destroy();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register,  login, logout  };
