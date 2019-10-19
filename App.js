import React, {Component} from 'react';
import {AppContainer} from "./navigation";
import {AppLoading, SplashScreen} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {Image, View} from "react-native";
import {
    AntDesign,
    FontAwesome,
    Ionicons,
} from '@expo/vector-icons';
import { Container, Text } from 'native-base';

export default class App extends Component {
    state = {
        isSplashReady: false,
        isAppReady: false,
    };

    render() {
        if (!this.state.isSplashReady) {
            return (
                <AppLoading
                    startAsync={this._cacheSplashResourcesAsync}
                    onFinish={() => this.setState({isSplashReady: true})}
                    autoHideSplash={false}
                />
            );
        }
        if (!this.state.isAppReady) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={require('./assets/images/splash.png')}
                        onLoad={this._cacheResourcesAsync}
                        resizeMode={'cover'}
                    />
                </View>
            );
        }
        return (
            <Container>
                <AppContainer/>
            </Container>
        );
    }

    _cacheSplashResourcesAsync = async () => {
        const splash = require('./assets/images/splash.png');
        return Asset.fromModule(splash).downloadAsync();
    };

    _cacheResourcesAsync = async () => {
        try {
            SplashScreen.hide();
            const imageAssets = this._cacheImages([
                require('./assets/icon.png'),
                require('./assets/images/holder.png'),
                require('./assets/images/bot.png'),
                require('./assets/images/add_bot.png'),
            ]);
            const fontAssets = this._cacheFonts([
                AntDesign.font,
                Ionicons.font,
                FontAwesome.font,
                {
                    'roboto-regular': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
                    'bebas-regular': require('./assets/fonts/bebas/bebas-regular.ttf')
                }
            ]);
            await Promise.all([...imageAssets, ...fontAssets]);
            this.setState({isAppReady: true});
        } catch (e) {
        }
    };

    _cacheImages = images => {
        return images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    };

    _cacheFonts = fonts => {
        return fonts.map(font => Font.loadAsync(font));
    };
};
