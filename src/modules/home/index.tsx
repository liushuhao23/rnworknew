/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-27 13:38:00
 */
import {useLocalStore} from "mobx-react";
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import HomeStore from "../../stores/HomeStore";
import { useNavigation } from '@react-navigation/native';
import icon_heart from "../../assets/icon_heart.png";
import icon_heart_empty from "../../assets/icon_heart_empty.png";
import FlowList from "../../components/flowlist/FlowList.js";
import ResizeImage from "../../components/ResizeImage";
import Heart from "./components/Heart";
import CategoryList from "./components/CategoryList";
import TitleBar from "./components/TitleBar";
import TitleBarMy from "./components/TitleBarMy";
import { StackNavigationProp } from "@react-navigation/stack";


const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default observer(() => {
  const store = useLocalStore(() => new HomeStore());
  const navigation = useNavigation<StackNavigationProp<any>>();

  const refreshNewData = () => {
    store.resetPage();
    store.requestHomeList();
  };

  const onValueChanged = (value: boolean, item: any) => {
    console.log("🚀 ~ file: index.tsx:39 ~ onValueChanged ~ item:", item);
    console.log("输出value", value);
  };

  const renderList = ({item, index}: any) => {
    const  onArticlePress = (item: any) => {
      console.log("🚀 ~ file: index.tsx:44 ~ onArticlePress ~ item:", item)
      navigation.push("ArticleDetail", {id: item.id})
    }
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>onArticlePress(item)}
      >
        <ResizeImage uri={item.image}></ResizeImage>
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart value={item.isFavorite} onValueChanged={value => onValueChanged(value, item)}></Heart>
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FootCOmponent = () => {
    return <Text style={styles.footerTxt}>没有更多数据了</Text>;
  };

  const handleEndReached = () => {
    store.requestHomeList();
    console.log("输出");
  };

  const tabChanged = (value: {title: string, key: number}) => {
    console.log("🚀 ~ file: index.tsx:69 ~ onTabChanged ~ value:", value)
  }

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);
  const categoryList = store.categoryList.filter(i => i.isAdd);
  return (
    <View style={styles.root}>
      <TitleBarMy tab={1} onTabChanged={tabChanged} ></TitleBarMy>
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
        ListFooterComponent={FootCOmponent}
        ListHeaderComponent={
          <CategoryList
            categoryList={categoryList}
            allCategoryList={store.categoryList}
            onCategoryChange={(category: Category) => {
              console.log(JSON.stringify(category));
            }}
          />
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  FlatList: {
    width: "100%",
    height: "100%",
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: "white",
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: "hidden",
  },
  titleTxt: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  nameLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  countTxt: {
    fontSize: 14,
    color: "#999",
    marginLeft: 4,
  },
  footerTxt: {
    width: "100%",
    fontSize: 14,
    color: "#999",
    marginVertical: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
