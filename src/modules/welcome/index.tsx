/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-18 20:26:49
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-25 15:18:58
 */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
// import {load} from '../../utils/Storage';

import icon_logo_main from '../../assets/icon_main_logo.png';
import {clear, load} from '../../utils/Storage';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 2000);
  }, []);

  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    console.log('输出cacheUserInfo', cacheUserInfo)
    if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
      startHome();
    } else {
      startLogin();
    }
  };

  const startLogin = async () => {
    navigation.replace('Login');
  };

  const startHome = () => {
    navigation.replace('MainTab');
  };

  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_logo_main} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
