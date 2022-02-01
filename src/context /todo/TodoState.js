import React, {useContext, useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./TodoReducer";
import {
    ADD_TODO,
    CLEAR_ERROR,
    FETCH_TODOS,
    HIDE_LOADER,
    REMOVE_TODO,
    SHOW_ERROR,
    SHOW_LOADER,
    UPDATE_TODO
} from "../types";
import {ScreenContext} from "../screen/screenContext";
import {Alert} from "react-native";
import {Api} from "../../api";

export const TodoState = ({children}) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        clearError()
        try {
            const data = await Api.post(
                'https://rn-todo-48731-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                {title})
            dispatch({type: ADD_TODO, title, id: data.name})
        } catch (e) {
            showError('Error...')
        }
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Delete todo',
            `Do you really want to delete "${todo.title}"`,
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete', style: 'destructive',
                    onPress: async () => {
                        changeScreen(null)
                        await Api.delete(`https://rn-todo-48731-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`)
                        dispatch({type: REMOVE_TODO, id})
                    }
                }
            ],
            {cancelable: false}
        )
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await Api.get('https://rn-todo-48731-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
            dispatch({type: FETCH_TODOS, todos})
        } catch (e){
            showError('Error. Please try again.')
        } finally {
            hideLoader()
        }
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await Api.patch(
                `https://rn-todo-48731-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
                {title}
                )
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Error. Please try again.')
        }
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    const showError = (error) => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})

    return <TodoContext.Provider
        value={{todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos}}>
        {children}
    </TodoContext.Provider>
}