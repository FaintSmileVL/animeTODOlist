import React from "react";
import {NavigationActions} from "react-navigation";

export default class AbstractScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    navigateToScreen = (route, params) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params: params
        });
        this.props.navigation.dispatch(navigateAction);
    };
}