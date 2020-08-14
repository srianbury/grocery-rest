import CryptoJs from "crypto-js";

function decrypt(cipherText) {
  const bytes = CryptoJs.AES.decrypt(cipherText, process.env.JWT_SECRET_KEY);
  const plainText = bytes.toString(CryptoJs.enc.Utf8);
  return plainText;
}

export default decrypt;
