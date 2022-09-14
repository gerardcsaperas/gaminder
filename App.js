import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/** screens */
import Home from './src/screens/Home';
import Chat from './src/screens/Chat';
import Login from './src/screens/Login';

export default function App() {
  const Stack = createNativeStackNavigator();
  const user = false;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user && (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Chat" component={Chat} />
            </>
          )
        }
        {
          !user &&
          <Stack.Screen name="Login" component={Login} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
