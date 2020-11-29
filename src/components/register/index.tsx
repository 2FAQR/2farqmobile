import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import {PrivateKey} from 'eciesjs';
// import {generatePair} from '../../services/ecc';

interface RegisterScan {
  hash: string;
  userId: string;
}

const Register = () => {
  const navigation = useNavigation();

  const [privateKey, setPrivateKey] = React.useState<string>('');
  const [publicKey, setPublicKey] = React.useState<string>('');

  // React.useEffect(() => {
  //   if (privateKey === '' && publicKey === '') {
  //     const pKey: PrivateKey = generatePair();
  //     setPrivateKey(pKey.toHex());
  //     setPublicKey(pKey.toHex());
  //   }
  // }, [privateKey, publicKey]);

  const onSuccess = (e) => {
    const hash: RegisterScan = JSON.parse(e.data);
    console.log(hash);
    set(hash.userId, privateKey).then(() => {
      navigation.navigate('root');
    });
  };

  const set = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // save error
    }
    console.log('Done.');
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

export default Register;
