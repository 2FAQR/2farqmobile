import {encrypt, decrypt, PrivateKey} from 'eciesjs';

export const generatePair = (): PrivateKey => {
  return new PrivateKey();
};
export const decryptMessage = (privateKey: string, message: Buffer): string => {
  return decrypt(privateKey, message).toString();
};

export const encryptMessage = (publicKey: string, message: Buffer): string => {
  return encrypt(publicKey, message).toString();
};
