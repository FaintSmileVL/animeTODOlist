import React, {Component} from "react";
import {Text, View} from "react-native";
import Theme from "../theme";
//import PropTypes from 'prop-types';

export class AdviseView extends Component {
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
                    {this.props.hasOwnProperty('advise') && this.props.advise}
                </Text>
            </View>
        )
    }
}
/*
AdviseView.propTypes = {
    text: PropTypes.string
};

AdviseView.defaultProps = {
    text: ' '
}*/

