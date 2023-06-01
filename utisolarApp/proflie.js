import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function Profile({ navigation }) {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState({});
    const [site, setSite] = useState({});

    const handleLogout = async () => {
        try {
            const existingData = await AsyncStorage.getItem('User');
            if (existingData !== null) {
                const parsedData = JSON.parse(existingData);
                parsedData.id = null;
                const updatedData = JSON.stringify(parsedData);
                await AsyncStorage.setItem('User', updatedData);
                navigation.navigate('Login');
            } else {
                console.error('Data not found!');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        async function fetchSite() {
            await AsyncStorage.getItem('User')
                .then((u) => {
                    const user = JSON.parse(u);
                    setUser(user)
                    fetch('http://139.5.146.172:8080/api-1.0/api/tbluserssites/getbyuserid/' + parseInt(user.id), {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => response.json())
                        .then((json) => {
                            fetch('http://139.5.146.172:8080/api-1.0/api/tblsites/getbyid/' + parseInt(json.id.idSite), {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            })
                                .then(response => response.json())
                                .then((json) => {
                                    setSite(json.id)
                                    setIsLoading(false)
                                })
                                .catch(error => {
                                    setError(error)
                                    setIsLoading(false)
                                });
                        })
                        .catch(error => {
                            setError(error)
                            setIsLoading(false)
                        });
                });
        }
        fetchSite()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading && error && error.message === 'Network request failed' ? (
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.textData}>Error</Text>
                            <MaterialCommunityIcons name="access-point-network-off" size={100} color="#5800BB" />
                            <Text style={styles.textData}>Network request failed</Text>
                            <Text style={styles.textData}>The server is fail</Text>
                            <Text style={styles.textData}>Please change URL or try again later</Text>
                        </View>
                    </View>
                </View>
            ) : !isLoading && error ? (
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.textData}>Error</Text>
                            <MaterialIcons name="error" size={100} color="#5800BB" />
                            <Text style={styles.textData}>Unknown error</Text>
                            <Text style={styles.textData}>Please try again later</Text>
                        </View>
                    </View>
                </View>
            ) : !isLoading ? (
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <View style={styles.headContainer}>
                            <Text style={styles.textData}>Profile</Text>
                            <Ionicons name="person" size={100} color="black" />
                            {user !== null ? (
                                <Text style={styles.textData}>{user.username}</Text>
                            ) : (
                                <ActivityIndicator />
                            )}
                            {site !== null ? (
                                <Text style={styles.textData}>{site.sitename}</Text>
                            ) : (
                                <ActivityIndicator />
                            )}
                            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                <Text style={styles.textStyle}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <View style={styles.errorContainer}>
                            <ActivityIndicator size="large" color="#5800BB" />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#E5E5E5',
        justifyContent: 'center'
    },
    dataContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        backgroundColor: "white",
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 5
    },
    headContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        margin: 2,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#E5E5E5",
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        margin: 10
    },
    textStyle: {
        color: "black"
    },
    textData: {
        color: 'black',
        fontSize: 20,
        margin: 10
    }
});