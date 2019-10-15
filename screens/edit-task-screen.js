import * as React from "react";
import {Image, StyleSheet, TextInput, View} from "react-native";
import AbstractScreen from "./abstract-screen";
import {Header} from "../components/header";
import Theme from "../theme";
import {AdviseView} from "../components/advise-view";

export class EditTaskScreen extends AbstractScreen {
    constructor(props) {
        super(props);
        this.handleButtonChangeSingle = this.handleSubmit.bind(this);
        this.state = {
            messageText: '',
        };
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Theme.backgroundSecondary}}>
                <Header
                    onPressBack={this._goToMainScreen}
                    text='Изменить задачу'
                />
                <AdviseView
                    text='Измени задачу'
                    advise='Просто набери текст и нажми на галочку.'
                />
                <View
                    style={{flex: 1}}
                >
                    <TextInput
                        placeholder={this.props.navigation.getParam('editableText')}
                        maxLength={1024}
                        style={styles.textField}
                        onFocus={() => {
                            this.setState({
                                messageText: this.props.navigation.getParam('editableText')
                            })
                        }}
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
                            source={require('../assets/images/bot.png')}
                            onLoad={this._cacheResourcesAsync}
                            resizeMode={'stretch'}
                        />
                    </View>
                </View>
            </View>
        );
    }

    handleSubmit = () => {
        this.props.navigation.getParam('onSubmit')(this.state.messageText);
        this._goToMainScreen();
    };
    _goToMainScreen = () => {
        this.navigateToScreen('Main', null);
        this.setState({
            messageText: '',
            editableTask: null
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