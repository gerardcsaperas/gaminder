import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { gamecubeBright, gamecubeDark, textXL } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '../hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
    const navigation = useNavigation();
    const { loginGoogle } = useAuth();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    return (
        <LinearGradient
            colors={[gamecubeBright, gamecubeDark]}
            style={styles.container}
        >
            <MaterialCommunityIcons
                name="nintendo-game-boy"
                size={300}
                color="white"
                style={{ marginBottom: 100, textAlign: 'center' }}
            />
            <TouchableOpacity
                style={styles.loginButton}
                // leave `showInRecents: true` option for Android
                onPress={() => loginGoogle({ showInRecents: true })}
            >
                <Text style={styles.loginButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            <Text style={styles.callToAction}>
                Meet people that love video games, anime, and manga as much as
                you do.
            </Text>
        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 50
    },
    loginButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20
    },
    loginButtonText: {
        color: gamecubeDark,
        fontSize: textXL,
        textAlign: 'center'
    },
    callToAction: {
        marginTop: 24,
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
});
