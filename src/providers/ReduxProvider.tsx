'use client'

import {ReactNode, useMemo} from "react";
import {Provider} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {AppStore, makeStore} from "@/store/store";

interface ReduxProviderProps {
    children: ReactNode;
}

let store: AppStore;

const ReduxProvider = ({ children }: ReduxProviderProps) => {
    const storeInstance = useMemo(() => {
        if (!store) {
            store = makeStore();
            setupListeners(store.dispatch); // Вызываем setupListeners здесь
        }
        return store;
    }, []);

    return (
        <Provider store={storeInstance}>{children}</Provider>
    )
};

export default ReduxProvider;