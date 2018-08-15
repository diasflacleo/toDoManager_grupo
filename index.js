import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import { Routes } from './src/routes/Routes';
import { initializeFirebaseApi } from './src/services/FirebaseApi';

console.disableYellowBox = true;

const wrappedRoutes = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <Routes />
    </SafeAreaView>
);

AppRegistry
    .registerComponent('ToDoManager_TurmaA_2017',
        () => {
            initializeFirebaseApi();
            return wrappedRoutes;
        });
