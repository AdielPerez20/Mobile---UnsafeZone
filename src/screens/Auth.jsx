import React from 'react';
import { useState } from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Auth = () => {
    const [authState, setAuthState] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChangeText = (name, value) =>
        setAuthState({ ...authState, [name]: value });

    const onLogin = () => {
        if (authState.email != "unsafeZone@gmail.com" && authState.password != "123456") {
            Alert.alert('Error', 'Please enter email and password');
        } else {
            setLoading(true);
            setTimeout(() => {
                // in real-world we can remove this setTimeout and use our Auth API to log into the app.
                setLoading(false);
                navigation.navigate('Home');
                setAuthState({ email: '', password: '' });
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="#fa2d2d"
                    value={authState.email}
                    name="email"
                    onChangeText={(text) => onChangeText('email', text)}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#fa2d2d"
                    style={styles.input}
                    value={authState.password}
                    name="password"
                    onChangeText={(text) => onChangeText('password', text)}
                />
            </View>
            <Pressable style={styles.loginBtn} onPress={onLogin}>
                {loading && <ActivityIndicator color="#fefefe" />}
                <Text style={styles.loginText}>Login</Text>
            </Pressable>
        </View>
    );
};

export default Auth;

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 12, marginTop: 12, flexGrow: 1 },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#fa2d2d',
        padding: 8,
        marginBottom: 4,
    },
    loginBtn: {
        paddingVertical: 12,
        backgroundColor: '#fa2d2d',
        borderRadius: 8,
        margin: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        textAlign: 'center',
        color: '#fefefe',
        fontSize: 16,
        marginLeft: 8,
    },
});
