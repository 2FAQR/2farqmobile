import React from 'react';
import {Text, Button} from 'react-native';

interface Props {
  skey: string;
  navigation: any;
}

const WebsiteListComponent: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <>
      <Text>{props.skey}</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login', {skey: props.skey})}
      />
    </>
  );
};

export default WebsiteListComponent;
