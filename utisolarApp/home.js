import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardComponents from './Dashboard'

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
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
              return <Ionicons name="home" size={24} color="black" />
            }
            else if (route.name === "monitoring") {
              return <Ionicons name="apps" size={24} color="black" />
            }
            else if (route.name === "billing")
              return <MaterialIcons name="info" size={24} color="black" />
          }
        })
        }
      >
        <Tab.Screen name="dashboard" component={DashboardComponents} options={{ title: "Dashboard" }} />
        <Tab.Screen name="monitoring" component={DashboardComponents} options={{ title: "Monitoring" }} />
        <Tab.Screen name="billing" component={DashboardComponents} options={{ title: "Billing" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App