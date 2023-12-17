/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-10-08 21:28:36
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-15 17:34:06
 */
import React from 'react';
import {StatusBar, Text, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Router from './src/router/index';

function App(): JSX.Element {
  return (
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <Router />
      </SafeAreaProvider>
  );
}

export default App;
