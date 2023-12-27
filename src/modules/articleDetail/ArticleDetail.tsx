/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-12-27 09:38:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-27 17:02:10
 */
import React, {FC, useEffect} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import icon_arrow from "../../assets/icon_arrow.png";
import ArticleDetailStore from "./ArticleDetailStore";
import { observer, useLocalStore } from "mobx-react";
import icon_share from '../../assets/icon_share.png';

type RouteParams = {
  ArticleDetail: {
      id: number;
  }
}


const ArticleDetailCom = observer(() => {
  const navtion = useNavigation<StackNavigationProp<any>>();
  const store = useLocalStore(() => new ArticleDetailStore());
  const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
  const { detail } = store;
  console.log("🚀 ~ file: ArticleDetail.tsx:31 ~ ArticleDetailCom ~ detail:", detail)
  const renderTitle = () => {
    const returnTab = () => {
      navtion.goBack();
    };
    return (
      <View style={styles.title}>
        <TouchableOpacity  onPress={returnTab}>
          <Image style={styles.return} source={icon_arrow}></Image>
        </TouchableOpacity>
        <Image style={styles.avatarImg} source={{uri: detail.avatarUrl}} />
        <Text style={styles.userName}>{detail.userName}</Text>
        <View style={styles.follow}>
          <Text style={styles.followText}>关注</Text>
        </View>
        <Image style={styles.shareImg} source={icon_share} />
      </View>
    );
  };
  const renderArticlebg = () => {
    
  }
  useEffect(() => {
    store.requestArticleDetail(params.id)
  }, []);
  return (
    <SafeAreaView>
      <View>
        {renderTitle()}
        <Text>sssss1</Text>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  title: {
    width: "100%",
    height: 54,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  return: {
    width: 30,
    height: 30,
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    marginLeft: 10,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  follow: {
    position: 'absolute',
    right: 50,
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: {
    fontSize: 12,
    color: '#ff2442',
  },
  shareImg: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
  }
});
export default ArticleDetailCom;
