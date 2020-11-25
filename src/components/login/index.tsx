import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';

const Login = ({navigation, route}) => {
  const onSuccess = (e) => {
    console.log('register' + e.data);
  };
  React.useEffect(() => {
    console.log(route.params.skey);
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
