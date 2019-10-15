import {AsyncStorage} from "react-native";

export class TaskController {
    static async saveTaskList(value) {
        try {
            await AsyncStorage
                .removeItem('@taskList');
            await AsyncStorage
                .setItem('@taskList', JSON.stringify(value))
        } catch (e) {
            console.log(e.message)
        }
    }

    static async addTask(message) {
        try {
            let taskList = await TaskController.getTaskList();
            const task = {
                message: message,
                isDone: false,
                date: Date.now()
            };
            if (!taskList) {
                taskList = [task];
            } else {
                taskList.push(task);
            }
            await TaskController
                .saveTaskList(taskList)
        } catch (e) {
            console.log(e);
        }
    }

    static async getTaskList() {
        try {
            return JSON
                .parse(
                    await AsyncStorage
                        .getItem("@taskList")
                );
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }
}