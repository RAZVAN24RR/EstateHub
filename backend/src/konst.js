const bcrypt = require("bcrypt");
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET || "private.key";

module.exports = {
  JWT_SECRET,
  SALT,
};
