import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Text, SafeAreaView } from 'react-native';
//import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardComponents from './Dashboard'
import MonitoringComponents from './monitoring'
import BillingComponents from './billing'
import ProfileComponents from './proflie'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // try {
    //   const response = await fetch('http://172.31.48.1:8080/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password
    //     })
    //   });
    //   if (response.ok) {
    //     const data = await response.json();
    //     await AsyncStorage.setItem('authToken', data.token);
    //     navigation.navigate('Home');
    //   } else {
    //     Alert.alert('Invalid credentials', 'Please check your username and password.');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert('Error', 'An error occurred while trying to log in.');
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Text style={styles.textData}>Login</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{ backgroundColor: "white", margin: 10, width: '95%', alignSelf: 'center' }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ backgroundColor: "white", margin: 10, width: '95%', alignSelf: 'center' }}
            />
            <TouchableOpacity
              style={styles.button} onPress={handleLogin}>
              <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: "black"
                },
                headerTintColor: "white",
                headerTitleStyle: {
                  fontWeight: "bold"
                },
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
                tabBarActiveBackgroundColor: "white",
                tabBarIcon: () => {
                  if (route.name === "dashboard") {
                    return <MaterialCommunityIcons name="tablet-dashboard" size={24} color="black" />
                  }
                  else if (route.name === "monitoring") {
                    return <MaterialIcons name="monitor" size={24} color="black" />
                  }
                  else if (route.name === "billing") {
                    return <FontAwesome5 name="money-bill" size={24} color="black" />
                  }
                  else if (route.name === "profile") {
                    return <AntDesign name="profile" size={24} color="black" />
                  }
                }
              })
              }
            >
              <Tab.Screen name="dashboard" component={DashboardComponents} options={{ title: "Dashboard" }} />
              <Tab.Screen name="monitoring" component={MonitoringComponents} options={{ title: "Monitoring" }} />
              <Tab.Screen name="billing" component={BillingComponents} options={{ title: "Billing" }} />
              <Tab.Screen name="profile" component={ProfileComponents} options={{ title: "Profile" }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
    alignItems: 'center',
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

export default App;