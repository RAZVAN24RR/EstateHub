const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { JWT_SECRET } = require("../konst"); //something

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
    const decodedJwt = jwt.verify(token, JWT_SECRET);
    if (!decodedJwt) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
    const { userId } = decodedJwt;
    if (userId) {
      res.locals.userId = userId;
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).send();
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  } //*/
};

module.exports = isAuth;
