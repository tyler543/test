const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.ACCESS_TOKEN_SECRET || 'fallback-secret';

exports.createToken = function (firstName, lastName, id) {
  try {
    const user = { userId: id, firstName, lastName };
    const accessToken = jwt.sign(user, secret, { expiresIn: '1h' });
    return accessToken; // ✅ return token string directly
  } catch (e) {
    return null; // or throw the error if preferred
  }
};

exports.isExpired = function (token) {
  try {
    jwt.verify(token, secret);
    return false;
  } catch (err) {
    return true;
  }
};

exports.refresh = function (token) {
  try {
    const decoded = jwt.decode(token);
    if (!decoded) return null;

    const { userId, firstName, lastName } = decoded;
    return exports.createToken(firstName, lastName, userId);
  } catch (e) {
    return null;
  }
};
// hi