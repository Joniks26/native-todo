import React from "react";
import {View, StyleSheet} from "react-native";
import {THEME} from "../styles";
import {AppTextBold} from "../ui/AppTextBold";

export const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <AppTextBold style={styles.text}>{props.title}</AppTextBold>
        </View>
        )
}

const styles = StyleSheet.create({
    navbar: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: THEME.MAIN_COLOR ,
        paddingBottom: 20,

    },
    text: {
        color: 'white',
        fontSize: 20,
    },
})