/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 19:37:14
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-11-27 21:54:54
 */
import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import login from '../../src/modules/login/index';
import welcome from '../../src/modules/welcome/index';
import MainTab from '../../src/modules/MainTab';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import {View} from 'react-native';

// const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Index: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          cardStyle: {elevation: 1},
        }}>
        <Stack.Screen
          name="Welcome"
          component={welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={login}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Index;
