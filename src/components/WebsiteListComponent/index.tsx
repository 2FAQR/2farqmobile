import React from 'react';
import {Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';

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
    <View
      style={{
        margin: 10,
        padding: 20,
        backgroundColor: '#d3d8e0',
      }}>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 15, textAlign: 'center'}}>
          {props.storageKey}
        </Text>
      </View>
      <View>
        <View style={{marginBottom: 20}}>
          <Button
            title="Login"
            onPress={() =>
              navigation.navigate('Login', {username: props.storageKey})
            }
          />
        </View>
        <View style={{marginBottom: 20}}>
          <Button color={'#ad2424'} title="Delete" onPress={deleteItem} />
        </View>
      </View>
    </View>
  );
};

export default WebsiteListComponent;
