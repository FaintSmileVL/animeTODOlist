import {Text, View} from "react-native";
import React, {Component} from "react";
import Theme from "../theme";

export class CurrentDateView extends Component {
    render() {
        return (
            <View
                style={{
                    height: 64,
                    justifyContent: 'center',
                    paddingLeft: 10,
                    paddingBot: 15,
                    borderColor: Theme.borderColor,
                    borderBottomWidth: 1,
                    borderTopWidth: 1
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        color: Theme.textLight2,
                        fontWeight: 'bold',
                        alignItems: 'flex-start'
                    }}
                >
                    {this.props.hasOwnProperty('text') && this.props.text}
                </Text>
                <Text
                    style={{
                        color: Theme.textLight2
                    }}
                >
                    {this.getDate()}
                </Text>
            </View>
        )
    }
    getDate = () => {
        let date = new Date();
        return date.toLocaleDateString();
    };
}