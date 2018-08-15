import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

export default class App extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>

                <View ref='first' style={[styles.first, styles.common]}>
                    <View style={styles.subView} />
                    <View style={styles.subView} />
                    <View style={styles.subView} />
                </View>

                <View ref='second' style={styles.second}>
                    <View style={styles.subView} />
                    <View style={styles.subView} />
                    <View style={styles.subView} />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    first: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    second: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: 40,
        borderColor: 'red',
        borderWidth: 1
    },
    common: {
        margin: 40,
        borderColor: 'red',
        borderWidth: 1
    },
    subView: {
        height: 50,
        width: 50,
        backgroundColor: 'blue'
    }
});
