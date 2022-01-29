import React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {AppTextBold} from "./AppTextBold";
import {THEME} from "../styles";

export const AppButton = ({children, onPress, color= THEME.MAIN_COLOR}) => {
  return (
      <TouchableOpacity onPress={onPress}>
          <View style={{...styles.button, backgroundColor: color}}>
              <AppTextBold style={styles.text}>{children}</AppTextBold>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: '#fff'
    }
})