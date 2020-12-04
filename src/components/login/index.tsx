import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';
import {SERVER_BASE_URL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PrivateKey, decrypt} from 'eciesjs';
import {decryptMessage} from '../../services/ecc';
import {Buffer} from 'buffer';

const Login = ({navigation, route}) => {
  const onSuccess = (e) => {
    const qrText: string = e.data;
    const splitText: string[] = qrText.split('____');
    const encData = splitText[0];
    const token = splitText[1];
    const username = splitText[2];
    // decrypt the hash here
    AsyncStorage.getItem(username).then((res: string | null) => {
      if (res) {
        const privateKey = PrivateKey.fromHex(res);
        console.log(encData);
        console.log(token);
        const decryptedHash = decryptMessage(
          privateKey.toHex(),
          Buffer.from(encData, 'hex'),
        );
        loginVerify(token, decryptedHash)
          .then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.warn('Login Verification Failed');
            console.warn(error);
          });
      }
    });
  };

  const loginVerify = async (token: string, hash: string) => {
    try {
      const response = await fetch(SERVER_BASE_URL + '/qrcode/verifylogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          hash: hash,
        }),
      });
      return await response.json();
    } catch (error) {
      console.warn(error.message);
    } finally {
      console.log('login run complete');
    }
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text>
          Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and
          scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity>
          <Text>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Login;
