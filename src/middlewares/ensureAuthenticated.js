const { verify } = require('jsonwebtoken');

const ensureAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Token não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    verify(token, '0f5c405c-a1a3-4ded-814f-d1e4d8d3b814');

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
}

module.exports = ensureAuthenticated;