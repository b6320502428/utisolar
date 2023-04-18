import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponents from './home'

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.31.48.1:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('authToken', data.token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while trying to log in.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
};

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Welcome to the home screen!</Text>
//     </View>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeComponents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;