import { Platform } from 'react-native';
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import { App, Login, Register, ToDoTasks, DoneTasks, Task } from '../screens/Screens';

export const tabTasksNavigator = createTabNavigator({
    tabToDoTasks: { screen: ToDoTasks, title: 'To Do' },
    tabDoneTasks: { screen: DoneTasks, title: 'Done' }
});

export const Routes = createStackNavigator(
    {
        pageApp: { screen: App },
        pageLogin: { screen: Login },
        pageRegister: { screen: Register },
        pageTaskList: {
            screen: tabTasksNavigator,
            navigationOptions: {
                ...Platform.select({
                    ios: {
                        title: 'Task List'
                    },
                    android: {
                        header: null
                    }
                })
            }
        },
        pageTask: { screen: Task }
    },
    {
        headerMode: 'screen'
    }
);