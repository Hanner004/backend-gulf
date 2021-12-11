const jwt = require("jsonwebtoken");
const { secret } = require("../config/secretKey");

async function isAuth(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(403).json({
      msg: "No se proporcionó ningún token",
    });
  }
  var token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(401).send({
        msg: "Token inválido",
      });
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = isAuth;
