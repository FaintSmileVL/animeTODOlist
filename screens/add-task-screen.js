import * as React from "react";
import {Text, StyleSheet, View, TextInput, SafeAreaView, Image} from "react-native";
import AbstractScreen from "./abstract-screen";
import {Header} from "../components/header";
import {TaskController} from "../controller/task-controller";
import {AdviseView} from "../components/advise-view";
import Theme from "../theme";

export class AddTaskScreen extends AbstractScreen {
    constructor(props) {
        super(props);
        this.handleButtonChangeSingle = this.handleSubmit.bind(this, false);
        this.state = {
            messageText: '',
        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Theme.backgroundSecondary}}>
                <Header
                    onPressBack={this._goToMainScreen}
                    text='Добавить задачу'
                />
                <AdviseView
                    text='Начни планирование своего дня'
                    advise='Просто набери текст и нажми на галочку.'
                />
                <View
                    style={{flex: 1}}
                >
                    <TextInput
                        placeholder='Начни вводить здесь'

                        maxLength={1024}
                        style={styles.textField}
                        onChangeText={text => {
                            this.setState({
                                messageText: text
                            });
                        }}
                        value={this.state.messageText}
                        onSubmitEditing={this.handleButtonChangeSingle}
                    />
                    <View style={{flex: 0.5, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image
                            source={require('../assets/images/add_bot.png')}
                            onLoad={this._cacheResourcesAsync}
                            resizeMode={'stretch'}
                        />
                    </View>
                </View>
            </View>
        );
    };

    handleSubmit = async () => {
        await TaskController
            .addTask(this.state.messageText)
            .catch(e => console.log(e));
        this.props.navigation.getParam('onSubmit')();
        this._goToMainScreen();
    };
    _goToMainScreen = () => {
        this.navigateToScreen('Main', null);
        this.setState({
            messageText: ''
        });
    };
}

const styles = StyleSheet.create({
    textField: {
        flex: 0.5,
        textAlignVertical: 'top',
        padding: 10,
        backgroundColor: Theme.backgroundPrimary,
        color: Theme.textLight,
        elevation: 3,
        borderBottomWidth: 1,
        borderColor: 'black'
    }
});