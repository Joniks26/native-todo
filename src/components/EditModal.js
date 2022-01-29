import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, Modal, Alert} from "react-native";
import {THEME} from "../styles";
import {AppButton} from "../ui/AppButton";

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if(title.trim().length < 3){
            Alert.alert('Warning', 'Todo title mist have any symbols')
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }
    
    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput value={title}
                           onChangeText={setTitle}
                           style={styles.input}
                           placeholder='Todo name'
                           autoCorrect={false}
                           maxLenght={64}/>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <AppButton color={THEME.DELETE_COLOR} onPress={cancelHandler}>Cancel</AppButton>
                    </View>
                    <View style={styles.button}>
                        <AppButton onPress={saveHandler}>Save</AppButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '40%'
    }
})