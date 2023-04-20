import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function Profile({ navigation }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    //const [user, setUser] = useState(null);

    // useEffect(() => {
    //   fetch("http://172.31.48.1:8080/api/user/1", {
    //     method: 'GET', headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //     .then(response => response.json())
    //     .then(json => setUser(json))
    //     .catch(error => console.error(error));
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.headContainer}>
                        <Text style={styles.textData}>Profile</Text>
                        <Text style={styles.textData}>User7Gen</Text>
                        <View style={styles.headContainer}>
                            <Text style={styles.textData}>Change Password</Text>
                            <TextInput
                                placeholder="Old Password"
                                value={oldPassword}
                                onChangeText={setOldPassword}
                                secureTextEntry
                                style={{ backgroundColor: "white", margin: 10, width: '95%', alignSelf: 'center' }}
                            />
                            <TextInput
                                placeholder="New Password"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry
                                style={{ backgroundColor: "white", margin: 10, width: '95%', alignSelf: 'center' }}
                            />
                            <TextInput
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChangeText={setConfirmNewPassword}
                                secureTextEntry
                                style={{ backgroundColor: "white", margin: 10, width: '95%', alignSelf: 'center' }}
                            />
                            <TouchableOpacity
                                style={styles.button} onPress={console.log(newPassword)}>
                                <Text style={styles.textStyle}>Change Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={console.log('Logout')}>
                                <Text style={styles.textStyle}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>

        /* {user && (
          <View>
            <Text>{user.username}</Text>
            <Text>{user.password}</Text>
          </View>
        )}
        <StatusBar style="auto" /> */

    );
}

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