import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import {THEME} from "./styles";
import {View} from "react-native";
import {Navbar} from "./components/Navbar";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {ScreenContext} from "./context /screen/screenContext";

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

    return (
        <View>
            <Navbar title='Todo App'/>
            <View style={styles.container}>
                {todoId ? <TodoScreen/> : <MainScreen/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    },
});
