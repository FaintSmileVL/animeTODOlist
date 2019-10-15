import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Constants from 'expo-constants';
import {BackButton} from './clickable/back-button'
import Theme from "../theme";

export class Header extends React.Component {
    render() {
        return (
            <View>
                <View
                    style={styles.headerTop}
                />
                <View style={styles.container}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <BackButton
                            onPress={this.props.hasOwnProperty('onPressBack') && this.props.onPressBack}
                            color={'white'}
                            style={{marginRight: 20}}
                        />
                    </View>
                    <View
                        style={{
                            flex: 4,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{color: 'white', fontSize: 20, textAlign: 'center'}}
                        >{this.props.hasOwnProperty('text') && this.props.text}</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                    </View>
                </View>
            </View>
        );
    }
}

const HEADER_HEIGHT = 76;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.headerSecondary,
        height: HEADER_HEIGHT - Constants.statusBarHeight
    },
    headerTop: {
        backgroundColor: Theme.headerPrimary,
        height: Constants.statusBarHeight
    }
});