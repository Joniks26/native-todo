import React, {useContext, useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./TodoReducer";
import {ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = title => dispatch({type: ADD_TODO, title})
    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Delete todo',
            `Do you really want to delete "${todo.title}"`,
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete', style: 'destructive',
                    onPress: () => {
                        changeScreen(null)
                        dispatch({type: REMOVE_TODO, id})
                    }
                }
            ],
            {cancelable: false}
        )
    }
    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})
    
    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    const showError = (error) => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})






    return <TodoContext.Provider value={{todos: state.todos, addTodo, removeTodo, updateTodo}}>
        {children}
    </TodoContext.Provider>
}