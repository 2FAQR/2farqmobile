import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';
import {SERVER_BASE_URL} from '../../config';

const Login = ({navigation, route}) => {
  const onSuccess = (e) => {
    const qrText: string = e.data;
    const splitText: string[] = qrText.split('____');
    const hash = splitText[0];
    const token = splitText[1];
    // decrypt the hash here
    console.log(hash);
    console.log(token);

    loginVerify(token, hash).then((res) => {
      console.log(res);
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
