import React from 'react';
import WebsiteListComponent from '../WebsiteListComponent/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const WebsiteList = ({navigation}) => {
  const [keys, setKeys] = React.useState<string[]>([]);
  const isFocused = useIsFocused();
  const getAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      setKeys(allKeys);
    } catch (e) {
      // read key error
      console.warn(e);
    }
    console.log(keys);
  };

  React.useEffect(() => {
    getAllKeys();
  }, [isFocused]);

  return (
    <>
      {keys.map((value: string) => {
        return (
          <WebsiteListComponent
            key={value}
            skey={value}
            navigation={navigation}
          />
        );
      })}
      {/* <Register /> */}
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </>
  );
};

export default WebsiteList;
