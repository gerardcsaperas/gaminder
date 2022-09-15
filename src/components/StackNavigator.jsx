import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
/** screens */
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Login from '../screens/Login';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user && (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Chat" component={Chat} />
                    </>
                )}
                {!user && <Stack.Screen name="Login" component={Login} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;
