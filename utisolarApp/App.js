import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Text, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
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
    try {
      const response = await fetch('http://139.5.146.172:8080/api-1.0/api/auth/login', {
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
        fetch('http://139.5.146.172:8080/api-1.0/api/tbluser/getbyusername/' + username, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async (json) => {
            try {
              const existingData = await AsyncStorage.getItem('User');
              if (existingData !== null) {
                await AsyncStorage.setItem('User', JSON.stringify(json));
                navigation.navigate('Home');
              } else {
                await AsyncStorage.setItem('User', JSON.stringify(json));
                navigation.navigate('Home');
              }
            } catch (error) {
              console.error('Error updating data:', error);
            }
          })
          .catch(error => console.error(error));
      } else {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while trying to log in.');
    }
  };

  useEffect(() => {
    async function chkUser() {
      const user = JSON.parse(await AsyncStorage.getItem('User'));
      if (user !== null) {
        if (user.id !== null) {
          navigation.navigate('Home');
        }
      }
    }
    chkUser()
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <View style={styles.headContainer}>
              <Text style={styles.textData}>Login</Text>
              <Image style={{ width: 300, height: 200 }} source={require('./assets/logo.png')} />
              <TextInput
                placeholder=" Username"
                value={username}
                onChangeText={setUsername}
                style={{ backgroundColor: "#D7D7D7", margin: 10, width: '95%', alignSelf: 'center', height:50,fontSize:20 }}
              />
              <TextInput
                placeholder=" Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ backgroundColor: "#D7D7D7", margin: 10, width: '95%', alignSelf: 'center', height:50,fontSize:20}}
              />
              <TouchableOpacity
                style={styles.button} onPress={handleLogin}>
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView >
    </SafeAreaProvider>
  );
};

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#5800BB"
                },
                headerTintColor: "white",
                headerTitleStyle: {
                  fontWeight: "bold"
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarActiveBackgroundColor: "#5000AB",
                tabBarInactiveBackgroundColor: "#5800BB",
                tabBarIcon: () => {
                  if (route.name === "dashboard") {
                    return <MaterialCommunityIcons name="tablet-dashboard" size={24} color="white" />
                  }
                  else if (route.name === "monitoring") {
                    return <MaterialIcons name="monitor" size={24} color="white" />
                  }
                  else if (route.name === "billing") {
                    return <FontAwesome5 name="money-bill" size={24} color="white" />
                  }
                  else if (route.name === "profile") {
                    return <AntDesign name="profile" size={24} color="white" />
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
    backgroundColor: '#E5E5E5',

  },
  dataContainer: {
    flex: 1,
    width: '98%',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "#E5E5E5",
    alignSelf: 'center'
  },
  headContainer: {
    flex: 1,
    width: '98%',
    borderRadius: 8,
    marginTop: 2,
    backgroundColor: "#E5E5E5",
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height:50,
    width: 100
  },
  textStyle: {
    color: "white",
    fontSize:20
  },
  textData: {
    color: 'black',
    fontSize: 25,
    margin: 10
  }
});

export default App;