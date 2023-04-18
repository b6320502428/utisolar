import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://172.31.48.1:8080/api/user/1", {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => setUser(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <Text>{user.username}</Text>
          <Text>{user.password}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});