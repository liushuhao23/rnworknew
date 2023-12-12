/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-12 22:04:27
 */
import {useLocalStore} from 'mobx-react';
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import HomeStore from '../../stores/HomeStore';
import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';
import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from '../../components/ResizeImage';
import Heart from './components/Heart';


const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const onValueChanged = (value: boolean, item : any) => {
    console.log("🚀 ~ file: index.tsx:39 ~ onValueChanged ~ item:", item)
    console.log('输出value', value);
  };

  const renderList = ({item, index}: any) => {
    console.log("🚀 ~ file: index.tsx:44 ~ renderList ~ item:", item)
    console.log('输出item.avatarUrl', item);
    console.log("🚀 ~ file: index.tsx:46 ~ renderList ~ item:", item)
    console.log('输出index', index);
    return (
      <View style={styles.item}>
        <ResizeImage uri={item.image}></ResizeImage>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart value={item.isFavorite} onValueChanged={(value) => onValueChanged(value, item)}></Heart>
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };

  const handleEndReached = () => {
    store.requestHomeList();
    console.log('输出');
  };

  useEffect(() => {
    store.requestHomeList();
  }, []);
  return (
    <View style={styles.root}>
      <FlowList
        contentContainerStyle={styles.container}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.01}
        onRefresh={refreshNewData}
        refreshing={store.refreshing}
        keyExtractor={(item: any) => `${item.id}`}
        style={styles.FlatList}
        data={store.homeList}
        renderItem={renderList}
        numColumns={2}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  FlatList: {
    width: '100%',
    height: '100%',
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
