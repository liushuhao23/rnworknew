import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, Text, Image, StyleSheet} from "react-native";

import icon_daily from "../../../assets/icon_daily.png";
import icon_search from "../../../assets/icon_search.png";

type Props = {
  tab: number;
  onTabChanged: (value: {title: string, key: number}) => void;
};

const navList = [
    {
        title: '关注',
        key: 0
    },
    {
        title: '发现',
        key: 1
    },
    {
        title: '北京',
        key: 2
    }
]

export default ({tab, onTabChanged}: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(tab);
  const change = (item: any) => {
    setTabIndex(item.key);
    onTabChanged(item)
  };
  const onSearch = () => {};
  const onDailyButton = () => {}
  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton} onPress={onDailyButton}>
        <Image source={icon_daily} style={styles.icon}></Image>
      </TouchableOpacity>
      {
        navList.map((item) => (
            <TouchableOpacity  key={item.key} style={styles.tabButton} onPress={() => change(item)}>
                <Text style={tabIndex === item.key ? styles.tabTxtSelected : styles.tabTxt} >{item.title}</Text>
            </TouchableOpacity>
        ))
      }
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Image source={icon_search} style={styles.icon}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleLayout: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  dailyButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 12,
    marginRight: 42,
  },
  searchButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 12,
    marginLeft: 42,
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: "#ff2442",
    borderRadius: 1,
    position: "absolute",
    bottom: 6,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabTxt: {
    fontSize: 16,
    color: "#999",
  },
  tabTxtSelected: {
    fontSize: 17,
    color: "#333",
  },
});
