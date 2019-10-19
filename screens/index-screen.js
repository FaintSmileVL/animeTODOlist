import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView, TouchableOpacity, Image
} from "react-native";
import AbstractScreen from "./abstract-screen";
import {TaskController} from "../controller/task-controller";
import {HeaderMain} from "../components/header-main"
import {TaskDoneOpacity} from "../components/clickable/opacity/task-done-opacity";
import {CurrentDateView} from "../components/current-date-view";
import {OverallOpacity} from "../components/clickable/opacity/overall-opacity";
import Theme from "../theme";
import {DeleteOpacity} from "../components/clickable/opacity/delete-opacity";
import { SwipeListView } from 'react-native-swipe-list-view';


export class MainScreen extends AbstractScreen {
    state = {
        TASK_LIST: [],
        isLoading: true,
        editableTask: null
    };

    constructor(props) {
        super(props);
        this.handleAddTask = this.showAddTaskScreen.bind(this);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: Theme.backgroundSecondary}}>
                <HeaderMain
                    text='Список задач'
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}
                >
                    <CurrentDateView
                        text='Сегодня'
                    />
                    <View
                        style={{backgroundColor: Theme.backgroundPrimary, flex: 1}}
                    >
                        {this.state.TASK_LIST && this.state.TASK_LIST.length > 0 ? this.renderFlatList() : this.renderEmptyListHolderImage()}
                    </View>
                </View>
                <OverallOpacity
                    onPress={this.handleAddTask}
                />
            </SafeAreaView>
        );
    };

    renderEmptyListHolderImage = () => {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Image
                    source={require('../assets/images/holder.png')}
                    onLoad={this._cacheResourcesAsync}
                    resizeMode={'stretch'}
                />
            </View>
        )
    };
    renderFlatList2 = () => {
         return (
             <FlatList
                 data={this.state.TASK_LIST}
                 renderItem={({item}) => this.renderFlatListItem(item)}
                 keyExtractor={item => item.date}
                 scrollEnabled
                 showsVerticalScrollIndicator={false}
                 extraData={this.state}
             />
         )
    };
    /**
     * Свайп влево - в архив
     * @returns {*}
     */
    renderFlatList = () => {
       return (
           <SwipeListView
               useFlatList
               disableRightSwipe={true}
               data={this.state.TASK_LIST}
               renderItem={ ({item}) => this.renderFlatListItem(item)}
               renderHiddenItem={ ({item}) => this.renderHiddenItem(item)}
               stopLeftSwipe={75}
               onSwipeValueChange={this.onSwipeValueChange}
           />
       )
    };

    onSwipeValueChange = (swipeData) => {
        const { key, value } = swipeData;
        console.log('swipeData', swipeData);
        // 375 or however large your screen is (i.e. Dimensions.get('window').width)
        console.log('key', key);
        console.log('value', value);
        /*
        if (value < -375 && !this.animationIsRunning) {
            this.animationIsRunning = true;
            Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
                const newData = [...this.state.TASK_LIST];
                const prevIndex = this.state.TASK_LIST.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                this.setState({TASK_LIST: newData});
                this.animationIsRunning = false;
            });
        }*/
    };

    renderHiddenItem = (item) => {
        return (
            <View style={styles.rowBack}>
                {item.isDone ? <Text>Left</Text> : <Text>Right</Text>}
            </View>
        );
    };

    renderFlatListItem = (task) => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderColor: Theme.borderColor,
                borderBottomWidth: 1,
                backgroundColor: Theme.backgroundPrimary
            }}>
                <View>
                    <View style={{paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
                        <TaskDoneOpacity
                            done={task.isDone}
                            onPress={() => {
                                this.taskDone(task).then(() => {
                                })
                            }}
                        />
                    </View>
                    <View style={{paddingLeft: 3, paddingRight: 10}}>
                        {task.isDone ? this.renderDelete(task) : <Text style={{fontSize: 30}}> </Text>}
                    </View>
                </View>
                <View style={{justifyContent: 'center', paddingTop: 5}}>
                    <View>
                        <TouchableOpacity
                            onLongPress={() => {
                                if (task.isDone) {
                                    return;
                                }
                                this.setState({
                                    editableTask: task
                                }, () => {
                                    this.showEditTaskScreen();
                                });
                            }}
                        >
                            <Text style={styles.text}>{task.message}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 22}}>
                        <Text style={styles.date}>Создана: {this.getTaskDate(task.date)}</Text>
                    </View>
                </View>
            </View>
        );
    };

    renderDelete = (task) => {
        return (
            <View style={{padding: 10,}}>
                <DeleteOpacity
                    onPress={() => {
                        this.taskDelete(task.date).then(() => {
                        })
                    }}
                />
            </View>
        );
    };

    getTaskDate = (taskDate) => {
        let date = new Date(taskDate);
        return date.toLocaleDateString();
    };

    taskDone = async (task) => {
        task.isDone = !task.isDone;
        await this.saveTaskList(this.state.TASK_LIST);
        this.init();
    };

    updateTask = async (messageText) => {
        this.state.editableTask.message = messageText;
        await this.saveTaskList(this.state.TASK_LIST);
        this.init();
    };

    taskDelete = async (taskDate) => {
        const taskList = await TaskController.getTaskList();
        const newTaskList = taskList.filter((task) => task.date !== taskDate);
        this.setState({
            TASK_LIST: newTaskList
        });
        await this.saveTaskList(newTaskList);
    };

    saveTaskList = async (list) => {
        await TaskController
            .saveTaskList(list)
            .catch(e => console.log(e));
    };

    showAddTaskScreen() {
        this.navigateToScreen('AddTask', {
            onSubmit: this.init
        });
    }

    showEditTaskScreen() {
        this.navigateToScreen('EditTask', {
            editableText: this.state.editableTask.message,
            onSubmit: this.updateTask
        });
    }

    init = async () => {
        try {
            const LIST = await TaskController.getTaskList();
            this.setState({
                TASK_LIST: LIST
            })
        } catch (e) {
            console.log(e)
        }
    };

    async componentDidMount() {
        await this.init();
        this.setState({
            isLoading: false
        })
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-regular',
        paddingRight: 50,
        fontSize: 16,
        color: Theme.textLight
    },
    date: {
        fontSize: 14,
        color: Theme.textLight2
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
});
