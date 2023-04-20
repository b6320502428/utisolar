import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
const Login = ({ navigation }) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',

    },
    dataContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "black",
        alignSelf: 'center'
    },
    headContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 2,
        backgroundColor: "black",
        //flexDirection: 'row',
        alignItems: 'center',
        //justifyContent:'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
    textStyle: {
        color: "black"
    },
    textData: {
        color: 'white', 
        fontSize: 20,
        margin: 10
    }  
});

export default Login;