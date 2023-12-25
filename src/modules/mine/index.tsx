/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-19 20:51:23
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-21 22:43:06
 */
import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, LayoutChangeEvent, RefreshControl} from "react-native";
import { set } from "mobx";

const WINDOW_DIMENSIONS = Dimensions.get("window");

import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import { observer, useLocalStore } from "mobx-react";
import MineStore from "./MineStore";
import UserStore from "../../stores/UserStore";


export default observer(() => {
  const [bgImgHeight, setBgImgHeight] = useState<number>(400);
  const [activeTab, setActiveTab] = useState<string>("note");

  const store = useLocalStore(() => new MineStore());


  const {userInfo} = UserStore;
  console.log("🚀 ~ file: index.tsx:41 ~ observer ~ userInfo:", userInfo)


  // const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    store.requestAll();
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
        color: '#333',
        marginHorizontal: 20,

        fontSize: 18,
      }
    });
    const barList = [
      {
        title: "笔记",
        key: "note",
      },
      {
        title: "收藏",
        key: "collect",
      },
      {
        title: "赞过",
        key: "Like",
      },
    ];

  
    const changeTab = (item: {title: string, key: string}) => {
      console.log("🚀 ~ file: index.tsx:55 ~ changeTab ~ item:", item)
      setActiveTab(item.key)
    }
    return (
      <View style={styles.content}>
        <View style={styles.barContent}> 
        {barList.map((item, index) => {
          return (
            <TouchableOpacity  onPress={() => changeTab(item)}>
              <View key={index}>
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
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      icon_menu: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      menuImg: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      rightMenuImg: {
        marginHorizontal: 12,
        tintColor: 'white',
      },
    })
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity  style={styles.menuButton}>
          <Image source={icon_menu} style={styles.icon_menu}></Image>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
        <Image source={icon_shop_car} style={[styles.menuImg, styles.rightMenuImg]}></Image>
        <Image source={icon_share} style={[styles.menuImg, styles.rightMenuImg]}></Image>
      </View>
    )
  }

  const renderInfo = () => {
    const {avatar, nickName, redBookId, desc, sex} = userInfo;
    console.log('输出avatar', avatar )
    const styles = StyleSheet.create({
      avatarLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
      },
      avatarImg: {
        width: 96,
        height: 96,
        resizeMode: 'cover',
        borderRadius: 48,
      },
      addImg: {
        width: 28,
        height: 28,
        marginLeft: -28,
        marginBottom: 2,
      },
      nameLayout: {
        marginLeft: 20,
      },
      nameTxt: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
      },
      idLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
      },
      idTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      qrcodeImg: {
        width: 12,
        height: 12,
        marginLeft: 6,
        tintColor: '#bbb',
      },
      descTxt: {
        fontSize: 14,
        color: 'white',
        paddingHorizontal: 16,
      },
      sexLayout: {
        width: 32,
        height: 24,
        backgroundColor: '#ffffff50',
        borderRadius: 12,
        marginTop: 12,
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
      },
      sexImg: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
      },
      infoLayout: {
        width: '100%',
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 28,
      },
      infoItem: {
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      infoValue: {
        fontSize: 18,
        color: 'white',
      },
      infoLabel: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 6,
      },
      infoButton: {
        height: 32,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
      },
      editTxt: {
        fontSize: 14,
        color: '#ffffff',
      },
      settingImg: {
        width: 20,
        height: 20,
        tintColor: '#ffffff',
      },
    });
    const {info} = store;
    return (
      <View
        onLayout={(e: LayoutChangeEvent) => {
          const {height} = e.nativeEvent.layout;
          setBgImgHeight(height);
        }}>
        <View style={styles.avatarLayout}>
          <Image style={styles.avatarImg} source={{uri: avatar}} />
          <Image style={styles.addImg} source={icon_add} />
          <View style={styles.nameLayout}>
            <Text style={styles.nameTxt}>{nickName}</Text>
            <View style={styles.idLayout}>
              <Text style={styles.idTxt}>小红书号：{redBookId}</Text>
              <Image style={styles.qrcodeImg} source={icon_qrcode} />
            </View>
          </View>
        </View>
        <Text style={styles.descTxt}>{desc}</Text>
        <View style={styles.sexLayout}>
          <Image
            style={styles.sexImg}
            source={sex === 'male' ? icon_male : icon_female}
          />
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
  };

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:14 ~ WINDOW_DIMENSIONS:", WINDOW_DIMENSIONS);
  }, []);
  return (
    <View>
      <View style={styles.root}>
        <Image style={[styles.bgImg, {height: bgImgHeight + 64}]} source={icon_mine_bg} />
        {
          renderTitle()
        }
      </View>
      <View style={styles.persionsInfo}></View>
        {renderTitleBar()} 
        {renderInfo()}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={store.refreshing}
            onRefresh={store.requestAll}
          />
        }>
        {/* {renderInfo()} */}
      </ScrollView>
      {/* <ScrollView style={styles.article}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        </Text>
      </ScrollView> */}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: "100%",
    // height: '100%',
    // backgroundColor: 'red',
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
    // borderBottomWidth: 1,
  },
  article: {
    width: "100%",
    backgroundColor: "white",
    height: WINDOW_DIMENSIONS.height - 275,
  },
  text: {
    fontSize: 32,
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
});
