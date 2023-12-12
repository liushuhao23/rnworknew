/*
 * @Description: 小心心
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-12-12 21:49:38
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-12-12 22:03:48
 */
import React, {useState, useEffect} from "react";
import {TouchableOpacity, View, Image, StyleSheet} from "react-native";
import icon_heart from "../../../assets/icon_heart.png";
import icon_heart_empty from "../../../assets/icon_heart_empty.png";

interface Props {
    value: boolean
    onValueChanged?: (value: boolean) => void;
}

const Index = (props: Props) => {
  const { value, onValueChanged } = props;
  const [showState, setShowState] = useState<boolean>(false);
  const onHeartPress = () => {
    const newState = !showState;
    setShowState(newState)
    onValueChanged && onValueChanged(newState)
  }

  useEffect(() => {
    setShowState(value)
  }, [value])
  return (
    <View>
      <TouchableOpacity onPress={onHeartPress}>
        <Image style={styles.container} source={showState ? icon_heart : icon_heart_empty}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
})
export default Index;
