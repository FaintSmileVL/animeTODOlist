import {Text, TouchableOpacity} from "react-native";
import React, {Component} from "react";
import Theme from "../../../theme";

export class TaskDoneOpacity extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 26,
                    height: 26,
                    backgroundColor: Theme.textLight2,
                    borderRadius: 26,
                }}
                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20
                    }}
                >{this.props.done ? '✓' : ' '}</Text>
            </TouchableOpacity>
        );
    }
}