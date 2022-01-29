import React from "react";
import {View, StyleSheet, TouchableOpacity, Button} from "react-native";
import {THEME} from "../styles";
import {AppTextBold} from "../ui/AppTextBold";
import {AntDesign} from "@expo/vector-icons";
import {AppButton} from "../ui/AppButton";

export const Todo = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => onOpen(todo.id)} >
            <View style={styles.todo}>
                <AppTextBold>{todo.title}</AppTextBold>
                <AppButton color={THEME.DELETE_COLOR} onPress={() => onRemove(todo.id)}>
                    <AntDesign name="delete" size={20}/>
                </AppButton>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginBottom: 10,
    },
})