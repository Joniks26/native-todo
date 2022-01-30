import React, {useContext, useState} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {THEME} from "../styles";
import {AppCard} from "../ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../ui/AppTextBold";
import {AppButton} from "../ui/AppButton";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {TodoContext} from "../context /todo/todoContext";
import {ScreenContext} from "../context /screen/screenContext";


export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    const [modal, setModal] = useState(false)

    const todo = todos.find(t => t.id === todoId)

    const saveHandler = async title => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal value={todo.title}
                       visible={modal}
                       onCancel={() => setModal(false)}
                       onSave={saveHandler}/>
            <AppCard>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={() => changeScreen(null)}>
                        <AntDesign name='back' size={20} color='#fff'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DELETE_COLOR} onPress={() => removeTodo(todo.id)}>
                        <AntDesign name="delete" size={20}/>
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around' // можно заменить на 'space-between'
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    }
})