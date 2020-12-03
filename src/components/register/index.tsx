import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {PrivateKey} from 'eciesjs';
import {generatePair, encryptMessage} from '../../services/ecc';
import {Buffer} from 'buffer';
import {SERVER_BASE_URL} from '../../config';
import {cos} from 'react-native-reanimated';

const Register = () => {
  const navigation = useNavigation();

  const [privateKey, setPrivateKey] = React.useState<string>('');
  const [publicKey, setPublicKey] = React.useState<string>('');

  React.useEffect(() => {
    if (privateKey === '' && publicKey === '') {
      const pKey: PrivateKey = generatePair();
      setPrivateKey(pKey.toHex());
      setPublicKey(pKey.publicKey.toHex());
    }
  }, [privateKey, publicKey]);

  const sendHashVerification = async (
    hash: string,
    jwtToken: string,
    pkey: string,
  ) => {
    try {
      const res = await fetch(SERVER_BASE_URL + '/qrcode/verifyregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtToken,
        },
        body: JSON.stringify({
          hash: hash,
          public_key: pkey,
        }),
      });
      console.log(res);
      const resJson: number = res.status;
      return resJson;
    } catch (error) {
      console.warn('Catch executed');
      console.warn(error.message);
    }
  };

  const onSuccess = (e) => {
    const qrText: string = e.data;
    const splitText: string[] = qrText.split('____');
    const hash = splitText[0];
    const token = splitText[1];
    console.log(hash);
    console.log(token);
    sendHashVerification(hash, token, publicKey)
      .then((res: number | undefined) => {
        console.log(res);
        if (res && res === 200) {
          console.log('Hash Updated');
          console.log(publicKey);
          set(publicKey).then(() => {
            console.log('public key added to the async storage');
          });
        }
      })
      .finally(() => {
        navigation.navigate('root');
      });
  };

  const set = async (value: string) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keyLength: number = keys.length;
      console.log('setting pkey');
      console.log(value);
      await AsyncStorage.setItem((keyLength + 1).toString(), value);
    } catch (e) {
      // save error
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
          <Text>{publicKey}</Text>
          <Text>{privateKey}</Text>
          <Text>{privateKey}</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Register;
