/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-11 10:50:39
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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const renderList = ({item, index}: any) => {
    console.log('输出item.avatarUrl', item);
    console.log('输出index', index);
    return (
      <View style={styles.item}>
        <Image
          style={{
            width: (SCREEN_WIDTH - 18) >> 1,
            height: 200,
            resizeMode: 'cover',
          }}
          source={{uri: item.image}}
        />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
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
      <FlatList
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
