import React, {useState} from "react";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import {MainLayout} from "./src/MainLayout";
import {TodoState} from "./src/context /todo/TodoState";
import {ScreenState} from "./src/context /screen/ScreenState";

async function loadApplication() {
    await Font.loadAsync({
        'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return <AppLoading startAsync={loadApplication}
                           onError={err => console.log(err)}
                           onFinish={() => setIsReady(true)}/>
    }

    return (
        <ScreenState>
            <TodoState>
                <MainLayout/>
            </TodoState>
        </ScreenState>
    )
}

