import React, {useContext, useEffect, useState, useCallback} from "react";
import {View, StyleSheet, FlatList, Image, Dimensions, Text} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../styles";
import {TodoContext} from "../context /todo/todoContext";
import {ScreenContext} from "../context /screen/screenContext";
import {AppLoader} from "../ui/AppLoader";
import {AppText} from "../ui/AppText";
import {AppButton} from "../ui/AppButton";

export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => { loadTodos() },[])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => {
            Dimensions.removeEventListener('change', update)
        }
    });

    if(loading) {
        return <AppLoader />
    }

    if(error) {
        return <View style={styles.center}>
            <AppText style={styles.error}>{error}</AppText>
            <AppButton onPress={loadTodos}>Try again</AppButton>
        </View>
    }

    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>
                )}
            />
        </View>
    )

    if (todos.length === 0) {
        content = <View style={styles.imgWrap}>
            <Image style={styles.image} source={require('../../assets/no-items.png')}/>
            <Text style={styles.message}>You don't have todos</Text>
            <Text>Create your first todo</Text>
        </View>

    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    message: {
        fontSize: 24,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    error: {
        fontSize: 20,
        color: THEME.DELETE_COLOR,
        marginBottom: 20,
    },
})