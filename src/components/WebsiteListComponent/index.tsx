import React from 'react';
import {Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  storageKey: string;
  skey: string;
  navigation: any;
}

const WebsiteListComponent: React.FC<Props> = (props) => {
  const {navigation} = props;
  const deleteItem = async () => {
    await AsyncStorage.removeItem(props.storageKey);
    navigation.navigate('root');
  };
  return (
    <>
      <Text>{'storage key : ' + props.storageKey}</Text>
      <Text>{'storage Value : ' + props.skey}</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login', {skey: props.skey})}
      />
      <Button title="Delete" onPress={deleteItem} />
    </>
  );
};

export default WebsiteListComponent;
