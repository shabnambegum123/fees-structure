const crypto = require("crypto");

const algorithm = process.env.algorithm;
const passphrase =process.env.passphrase;
var salt = crypto.randomBytes(16);
var iv = crypto.randomBytes(16);

const generatePasswordHash = (password) => {
  const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, "sha256");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  iv = iv.toString("hex");
  salt = salt.toString("hex");

  return `${encrypted}-${iv}-${salt}`;
};

module.exports = { generatePasswordHash }



