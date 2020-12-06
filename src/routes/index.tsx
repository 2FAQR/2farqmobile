import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import WebsiteList from '../components/WebsiteList/index';
import Register from '../components/register';
import Login from '../components/login/index';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="root"
        component={WebsiteList}
        options={{
          title: '2-faQR Mobile',
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default Router;
