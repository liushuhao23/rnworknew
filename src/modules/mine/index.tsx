/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-17 21:51:09
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Index = () => {
  return (
    <View>
      <View style={styles.root}></View>
      <View style={styles.persionsInfo}>

      </View>
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
  },
  persionsInfo: {
    width: 100,
    // height
  }
})
