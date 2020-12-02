import React from 'react';
import WebsiteListComponent from '../WebsiteListComponent/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const WebsiteList = ({navigation}) => {
  const [keys, setKeys] = React.useState<string[]>([]);
  const [keyValues, setValues] = React.useState<string[]>([]);
  const isFocused = useIsFocused();
  const getAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      setKeys(allKeys);
      let allValues: string[] = [];
      allKeys.map(async (key: string) => {
        const value = await AsyncStorage.getItem(key);
        allValues.push(value ? value : '');
      });
      setValues(allValues);
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
      {keys.map((key: string, index: number) => {
        const value = keyValues[index];
        return (
          <WebsiteListComponent
            key={key}
            storageKey={key}
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
