/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-19 17:43:19
 */
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
import icon_mine_bg from '../../assets/icon_mine_bg.png';


const WINDOW_DIMENSIONS = Dimensions.get('window');

const Index = () => {
  const [bgImgHeight, setBgImgHeight] = useState<number>(400);
  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:14 ~ WINDOW_DIMENSIONS:", WINDOW_DIMENSIONS)
  }, [])
  return (
    <View>
      <View style={styles.root}>
      <Image
                style={[styles.bgImg, { height: bgImgHeight + 64 }]}
                source={icon_mine_bg}
            />
      </View>
      <View style={styles.persionsInfo}>

      </View>
      <ScrollView style={styles.article}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor
        </Text>
      </ScrollView>
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    // height: '100%',
    // backgroundColor: 'red',
  },
  bgImg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 400,
  },
  persionsInfo: {
    width: '100%',
    height: 400,
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    borderTopStyle: 'solid',
    // height
  },
  article: {
    width: '100%',
    backgroundColor: 'white',
    height: WINDOW_DIMENSIONS.height - 275,
  },
  text: {
    fontSize: 32,
  },
})
