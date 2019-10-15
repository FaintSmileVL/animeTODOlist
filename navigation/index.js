import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {
    MainScreen,
    EditTaskScreen,
    AddTaskScreen
} from '../screens';

const App = createDrawerNavigator({
        Main: {
            screen: MainScreen,
        },
        EditTask: {
            screen: EditTaskScreen,
        },
        AddTask: {
            screen: AddTaskScreen,
        }
    });

export const AppContainer = createAppContainer(App);