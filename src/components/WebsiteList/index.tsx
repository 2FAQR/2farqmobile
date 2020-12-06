import React from 'react';
import WebsiteListComponent from '../WebsiteListComponent/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const WebsiteList = ({navigation}) => {
  const [keys, setKeys] = React.useState<string[]>([]);
  const [keyValues, setValues] = React.useState<[string, string | null][]>([]);
  const isFocused = useIsFocused();

  const getAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      setKeys(allKeys);
      await AsyncStorage.multiGet(
        allKeys,
        (error: Error[], result: [string, string | null][]) => {
          setValues(result);
        },
      );
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
    <SafeAreaView>
      <ScrollView>
        {keys.map((key: string, index: number) => {
          console.log(keyValues);
          const value =
            keyValues[index] !== undefined ? keyValues[index][1] : '';
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
          color={'#0bb53e'}
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WebsiteList;
