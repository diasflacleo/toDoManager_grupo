import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import TaskListView from '../components/TaskListView';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';

const imgChecList = require('../assets/checklist.png');
const imgPlus = require('../assets/plus_64.png');

export default class ToDoTasks extends Component {

    static navigationOptions = {
        tabBarLabel: 'To Do',
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgChecList}
                style={[styles.icon, { tintColor }]} />
        )
    }

    state = {
        tasks: []
    };

    render() {
        return (
            <View style={styles.container}>
                <TaskListView tasks={this.state.tasks} />
                <TouchableOpacity onPress={() => this.goToTask()}
                    style={styles.floatButton}>
                    <Image source={imgPlus} style={styles.img} />
                </TouchableOpacity>
            </View >
        );
    }

    goToTask() {
        this.props.navigation.navigate('pageTask');
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter((task) => !task.isDone);
        this.setState({ tasks: tasksToDo });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    icon: {
        width: 26,
        height: 26
    },
    img: {
        width: 50,
        height: 50
    },
    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },

});
