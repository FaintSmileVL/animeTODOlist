import {Text, TouchableOpacity} from "react-native";
import React, {Component} from "react";
import Theme from "../../../theme";

export class AddTaskOpacity extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 59,
                    height: 59,
                    backgroundColor: Theme.headerSecondary,
                    borderRadius: 56,
                }}
                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        color: Theme.textLight,
                        fontSize: 30
                    }}
                >+</Text>
            </TouchableOpacity>
        )
    }
}
