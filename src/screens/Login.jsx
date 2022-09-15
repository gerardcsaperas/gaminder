import { View, Button } from 'react-native';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import secrets from '../../secrets';

const GOOGLE_WEB_ID = process.env.GOOGLE_WEB_ID || secrets.GOOGLE_WEB_ID;
const GOOGLE_IOS_ID = process.env.GOOGLE_IOS_ID || secrets.GOOGLE_IOS_ID;
const GOOGLE_ANDROID_ID =
    process.env.GOOGLE_ANDROID_ID || secrets.GOOGLE_ANDROID_ID;

WebBrowser.maybeCompleteAuthSession();
const Login = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: GOOGLE_WEB_ID,
        webClientId: GOOGLE_WEB_ID,
        iosClientId: GOOGLE_IOS_ID,
        androidClientId: GOOGLE_ANDROID_ID
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log(authentication);
        }
    }, [response]);

    return (
        <View>
            <Button
                title="Sign in with Google"
                // leave `showInRecents: true` option for Android
                onPress={() => promptAsync({ showInRecents: true })}
            />
        </View>
    );
};

export default Login;
