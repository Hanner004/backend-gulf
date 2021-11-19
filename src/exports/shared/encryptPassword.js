const bcrypt = require("bcryptjs");

async function hash(password) {
  const salt = await bcrypt.genSalt(5);
  return bcrypt.hash(password, salt);
}

module.exports = {
  hash,
};
