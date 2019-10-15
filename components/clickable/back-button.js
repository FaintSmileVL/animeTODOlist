import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text, TouchableOpacity } from 'react-native';

const {OS} = Platform;

export class BackButton extends Component {
    render() {
        return (
            <TouchableOpacity
                hitSlop={{
                    right: 40,
                    left: 40,
                    top: 40,
                    bottom: 40
                }}
                onPress={() => {
                    if (this.props.navigation) {
                        this.props.navigation.goBack();
                    }
                    if(this.props.onPress) {
                        this.props.onPress();
                    }
                }}
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center'
                }, this.props.style]}
            >
                <Ionicons
                    name={OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
                    size={OS === "ios" ? 32 : 24}
                    color={this.props.color ? this.props.color : 'red'}
                    style={
                        OS === "ios"
                            ? { marginLeft: 9, marginRight: 5 }
                            : { marginLeft: 10 }
                    }
                />
                {OS === "ios" ? (
                    <Text style={{
                        fontFamily: 'roboto-regular',
                        fontSize: 17,
                        color: this.props.color ? this.props.color : 'white'
                    }}>Назад</Text>
                ) : null}
            </TouchableOpacity>
        )
    }
}