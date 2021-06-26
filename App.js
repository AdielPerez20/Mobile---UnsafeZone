import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './src/screens/Auth';
import Home from './src/screens/Home';
import Map from './src/screens/Map';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerTitle: 'Login' }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerTitle: 'Recent Alerts' }}
                />
                <Stack.Screen name="Map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
