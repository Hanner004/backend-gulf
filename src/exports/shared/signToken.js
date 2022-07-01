const jwt = require("jsonwebtoken");
const { secret } = require("../../config/secretKey");

async function signToken(id) {
  const payload = { _id: id };
  const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
  return token;
}

module.exports = signToken;
