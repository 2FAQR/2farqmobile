import {encrypt, decrypt, PrivateKey, PublicKey} from 'eciesjs';

export const generatePair = (): PrivateKey => {
  return new PrivateKey();
};
export const decryptMessage = (privateKey: string, message: Buffer): Buffer => {
  return decrypt(privateKey, message);
};

export const encryptMessage = (publicKey: string, message: Buffer): Buffer => {
  return encrypt(publicKey, message);
};
