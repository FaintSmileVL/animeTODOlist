import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";
import Theme from "../../../theme";
import { AntDesign } from '@expo/vector-icons';

export class DeleteOpacity extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                }}
                onPress={this.props.onPress}
            >
                <AntDesign
                    color='#AFAFAF'
                    size={20}
                    name='delete'
                />
            </TouchableOpacity>
        );
    }
}