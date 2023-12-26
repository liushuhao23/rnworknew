/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-26 15:40:26
 */
import React, {useCallback, useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, LayoutChangeEvent, RefreshControl} from "react-native";
import {set} from "mobx";

const WINDOW_DIMENSIONS = Dimensions.get("window");

import icon_mine_bg from "../../assets/icon_mine_bg.png";
import icon_menu from "../../assets/icon_menu.png";
import icon_shop_car from "../../assets/icon_shop_car.png";
import icon_share from "../../assets/icon_share.png";
import icon_location_info from "../../assets/icon_location_info.png";
import icon_qrcode from "../../assets/icon_qrcode.png";
import icon_add from "../../assets/icon_add.png";
import icon_male from "../../assets/icon_male.png";
import icon_female from "../../assets/icon_female.png";
import icon_setting from "../../assets/icon_setting.png";
import icon_no_note from "../../assets/icon_no_note.webp";
import icon_no_collection from "../../assets/icon_no_collection.webp";
import icon_no_favorate from "../../assets/icon_no_favorate.webp";
import {observer, useLocalStore} from "mobx-react";
import Empty from "../../components/Empty";
import Heart from "../../components/Heart";
import MineStore from "./MineStore";
import {load} from "../../utils/Storage";
import SideMenu from "./SideMenu";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
interface SideMenuRef {
  show: () => void;
  hide: () => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const EMPTY_CONFIG = [
  {icon: icon_no_note, tips: "快去发布今日的好心情吧～"},
  {icon: icon_no_collection, tips: "快去收藏你喜欢的作品吧～"},
  {icon: icon_no_favorate, tips: "喜欢点赞的人运气不会太差哦～"},
];

export default observer(() => {
  const [bgImgHeight, setBgImgHeight] = useState<number>(300);
  const [activeTab, setActiveTab] = useState<string>("note");
  const [useInfo, setUseInfo] = useState<any>({});
  const sideMenuRef = useRef<SideMenuRef>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const store = useLocalStore(() => new MineStore());
  const navigation = useNavigation<StackNavigationProp<any>>();
  const onArticlePress = useCallback(
    (article: ArticleSimple) => () => {
      navigation.push("ArticleDetail", {id: article.id});
    },
    [],
  );
  // const navigation = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    store.requestAll();
    load("userInfo").then(cacheUserInfo => {
      const userInfo = JSON.parse(cacheUserInfo!);
      setUseInfo(userInfo);
    });
  }, []);

  const renderTitleBar = () => {
    const styles = StyleSheet.create({
      content: {
        width: "100%",
        height: 64,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomColor: "#f5f5f5",
        borderBottomWidth: 1,
      },
      barContent: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        fontSize: 16,
        color: "#999",
        marginHorizontal: 20,
      },
      checkedTitle: {
        color: "#333",
        marginHorizontal: 20,

        fontSize: 18,
      },
    });
    const barList = [
      {
        title: "笔记",
        key: "note",
        index: 0
      },
      {
        title: "收藏",
        key: "collect",
        index: 1
      },
      {
        title: "赞过",
        key: "Like",
        index: 2
      },
    ];
    const changeTab = (item: {title: string; key: string, index: number}) => {
      setActiveTab(item.key);
      setTabIndex(item.index);
    };
    return (
      <View style={styles.content}>
        <View style={styles.barContent}>
          {barList.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => changeTab(item)}>
                <View>
                  <Text style={activeTab === item.key ? styles.checkedTitle : styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  const renderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
      },
      menuButton: {
        height: "100%",
        paddingHorizontal: 16,
        justifyContent: "center",
      },
      icon_menu: {
        width: 28,
        height: 28,
        resizeMode: "contain",
      },
      menuImg: {
        width: 28,
        height: 28,
        resizeMode: "contain",
      },
      rightMenuImg: {
        marginHorizontal: 12,
        tintColor: "white",
      },
    });

    const openMenu = () => {
      sideMenuRef.current?.show();
    };
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Image source={icon_menu} style={styles.icon_menu}></Image>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
        <Image source={icon_shop_car} style={[styles.menuImg, styles.rightMenuImg]}></Image>
        <Image source={icon_share} style={[styles.menuImg, styles.rightMenuImg]}></Image>
      </View>
    );
  };

  const renderInfo = () => {
    const styles = StyleSheet.create({
      avatarLayout: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 16,
        left: -20,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: "cover",
        borderRadius: 48,
        left: 20,
      },
      addImg: {
        width: 28,
        height: 28,
        // left: 90,
        // top: -25
      },
      nameLayout: {
        marginLeft: 20,
      },
      nameTxt: {
        fontSize: 22,
        color: "white",
        fontWeight: "bold",
      },
      idLayout: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: "#bbb",
      },
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: "#bbb",
      },
      descTxt: {
        fontSize: 14,
        color: "white",
        paddingHorizontal: 16,
      },
      sexLayout: {
        width: 32,
        height: 24,
        backgroundColor: "#ffffff50",
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        justifyContent: "center",
        alignItems: "center",
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: "contain",
      },
      infoLayout: {
        width: "100%",
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 28,
      },
      infoItem: {
        alignItems: "center",
        paddingHorizontal: 16,
      },
      infoValue: {
        fontSize: 18,
        color: "white",
      },
      infoLabel: {
        fontSize: 12,
        color: "#ddd",
        marginTop: 6,
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: "#ffffff",
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: "#ffffff",
      },
    });
    const {info} = store;
    return (
      <View style={{position: "absolute", top: 40}}>
        <View style={styles.avatarLayout}>
          <Image style={styles.avatarImg} source={{uri: useInfo.avatar}} />
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{useInfo.nickName}</Text>
            <View style={styles.idLayout}>
              <Text style={styles.idTxt}>小红书号：{useInfo.redBookId}</Text>
              <Image style={styles.qrcodeImg} source={icon_qrcode} />
            </View>
          </View>
        </View>
        <Text style={styles.descTxt}>{useInfo.desc}</Text>
        <View style={styles.sexLayout}>
          <Image style={styles.sexImg} source={useInfo.sex === "male" ? icon_male : icon_female} />
        </View>
        <View style={styles.infoLayout}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.followCount}</Text>
            <Text style={styles.infoLabel}>关注</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.fans}</Text>
            <Text style={styles.infoLabel}>粉丝</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{info.favorateCount}</Text>
            <Text style={styles.infoLabel}>获赞与收藏</Text>
          </View>

          <View style={{flex: 1}} />

          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.editTxt}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Image style={styles.settingImg} source={icon_setting} />
          </TouchableOpacity>
        </View>
      </View>
    );
    // return (
    //   <View
    //     onLayout={(e: LayoutChangeEvent) => {
    //       const {height} = e.nativeEvent.layout;
    //       setBgImgHeight(height);
    //     }}>
    // <View style={styles.avatarLayout}>
    //   <Image style={styles.avatarImg} source={{uri: avatar}} />
    //   <Image style={styles.addImg} source={icon_add} />
    //   <View style={styles.nameLayout}>
    //     <Text style={styles.nameTxt}>{nickName}</Text>
    //     <View style={styles.idLayout}>
    //       <Text style={styles.idTxt}>小红书号：{redBookId}</Text>
    //       <Image style={styles.qrcodeImg} source={icon_qrcode} />
    //     </View>
    //   </View>
    // </View>
    //     <Text style={styles.descTxt}>{desc}</Text>
    // <View style={styles.sexLayout}>
    //   <Image
    //     style={styles.sexImg}
    //     source={sex === 'male' ? icon_male : icon_female}
    //   />
    // </View>
    // <View style={styles.infoLayout}>
    //   <View style={styles.infoItem}>
    //     <Text style={styles.infoValue}>{info.followCount}</Text>
    //     <Text style={styles.infoLabel}>关注</Text>
    //   </View>
    //   <View style={styles.infoItem}>
    //     <Text style={styles.infoValue}>{info.fans}</Text>
    //     <Text style={styles.infoLabel}>粉丝</Text>
    //   </View>
    //   <View style={styles.infoItem}>
    //     <Text style={styles.infoValue}>{info.favorateCount}</Text>
    //     <Text style={styles.infoLabel}>获赞与收藏</Text>
    //   </View>

    //   <View style={{flex: 1}} />

    //   <TouchableOpacity style={styles.infoButton}>
    //     <Text style={styles.editTxt}>编辑资料</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.infoButton}>
    //     <Image style={styles.settingImg} source={icon_setting} />
    //   </TouchableOpacity>
    // </View>
    //   </View>
    // );
  };

  const renderList = () => {
    const {noteList, collectionList, favorateList} = store;
    console.log("🚀 ~ file: index.tsx:389 ~ renderList ~ favorateList:", favorateList);
    // console.log("🚀 ~ file: index.tsx:389 ~ renderList ~ collectionList:", collectionList);
    // console.log("🚀 ~ file: index.tsx:389 ~ renderList ~ noteList:", noteList);
    const currentList = [noteList, collectionList, favorateList][tabIndex];
    console.log("🚀 ~ file: index.tsx:390 ~ renderList ~ currentList:", currentList);
    if (!currentList?.length) {
      const config = EMPTY_CONFIG[tabIndex];
      return <Empty icon={config.icon} tips={config.tips} />;
    }
    const styles = StyleSheet.create({
      listContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "white",
      },
      item: {
        width: (SCREEN_WIDTH - 18) >> 1,
        backgroundColor: "white",
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 8,
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
      itemImg: {
        width: (SCREEN_WIDTH - 18) >> 1,
        height: 240,
      },
    });
    return (
      <View style={styles.listContainer}>
        {currentList.map((item, index) => {
          return (
            <TouchableOpacity key={`${item.id}-${index}`} style={styles.item} onPress={onArticlePress(item)}>
              <Image style={styles.itemImg} source={{uri: item.image}} />
              <Text style={styles.titleTxt}>{item.title}</Text>
              <View style={styles.nameLayout}>
                <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
                <Text style={styles.nameTxt}>{item.userName}</Text>
                <Heart
                  value={item.isFavorite}
                  onValueChanged={(value: boolean) => {
                    console.log(value);
                  }}
                />
                <Text style={styles.countTxt}>{item.favoriteCount}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    //
  }, []);
  return (
    <View>
      <View style={styles.root}>
        <Image style={[styles.bgImg, {height: bgImgHeight + 64}]} source={icon_mine_bg} />
        {renderTitle()}
        {renderInfo()}
      </View>
      <View style={styles.persionsInfo}></View>
      {renderTitleBar()}
      <ScrollView style={styles.article} refreshControl={<RefreshControl refreshing={store.refreshing} onRefresh={store.requestAll} />}>
        {renderList()}
      </ScrollView>
      {/* <ScrollView style={styles.article}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        </Text>
      </ScrollView> */}
      <SideMenu ref={sideMenuRef}></SideMenu>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  bgImg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 300,
  },
  persionsInfo: {
    width: "100%",
    height: 300,
  },
  article: {
    width: "100%",
    backgroundColor: "white",
    height: WINDOW_DIMENSIONS.height - 555,
  },
  text: {
    fontSize: 32,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
});
