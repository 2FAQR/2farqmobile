import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';
import {SERVER_BASE_URL} from '../../config';

const Login = ({navigation, route}) => {
  const onSuccess = (e) => {
    console.log('register' + e.data);
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(SERVER_BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      const respJson = response.json();
      return respJson;
    } catch (error) {
      console.warn(error.message);
    } finally {
      console.log('login run complete');
    }
  };
  React.useEffect(() => {
    console.log(route.params.skey);
    login('test@test.com', 'password').then((resp) => {
      console.log(resp);
    });
  }, []);
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
