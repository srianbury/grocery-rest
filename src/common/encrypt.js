import CryptoJs from "crypto-js";

function encrypt(plainText) {
  const cipherText = CryptoJs.AES.encrypt(
    plainText,
    process.env.JWT_SECRET_KEY
  ).toString();
  return cipherText;
}

export default encrypt;
