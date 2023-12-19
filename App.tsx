/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-10-08 21:28:36
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-17 20:19:19
 */
import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Router from './src/router/index';

function App(): JSX.Element {
  return (
      <SafeAreaProvider >
          <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
          <Router />
      </SafeAreaProvider>
  );
}

export default App;
