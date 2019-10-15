
import {View} from "react-native";
import React, {Component} from "react";
import {AddTaskOpacity} from "./add-task-opacity";

export class OverallOpacity extends Component {
    render() {
        return (
            <View
                style={{
                    position: 'absolute', bottom: 10, right: 10, zIndex: 200
                }}
            >
                <AddTaskOpacity
                    onPress={this.props.onPress}
                />
            </View>
        )
    }
}