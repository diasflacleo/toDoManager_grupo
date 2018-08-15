import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Big Blue</Text>
        <Text style={styles.smallRed}>Small Red</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigBlue: {
    color: 'blue',
    fontSize: 50
  },
  smallRed: {
    color: 'red',
    fontSize: 20
  }
});
