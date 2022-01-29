import React, {useState} from "react";
import {View, TextInput, Keyboard, StyleSheet, Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {THEME} from "../styles";
import {AppButton} from "../ui/AppButton";

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Wrong todo name')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput style={styles.input}
                       onChangeText={setValue}
                       value={value}
                       autoCorrect={false}
                       placeholder='Todo name'/>
            <AppButton onPress={pressHandler} >
                <AntDesign name="pluscircleo" size={20} color="#fff" />
            </AppButton>
        </View>
        )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,

    },
    input: {
        width: '75%',
        padding: 10,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR ,
    },
})