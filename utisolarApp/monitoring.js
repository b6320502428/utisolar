import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity,Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import * as Progress from 'react-native-progress';
import { LineChart } from 'react-native-chart-kit';

const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Purple
            strokeWidth: 2 // optional
        },
        {
            data: [99, 80, 28, 45, 20, 43],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red
            strokeWidth: 2 // optional
        }
    ]
};

const SelectOptions = () => {
    const [selectedValue, setSelectedValue] = useState('1');
    return (
        <View>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Day" value="1" />
                <Picker.Item label="Week" value="2" />
                <Picker.Item label="Month" value="3" />
                <Picker.Item label="Year" value="4" />
            </Picker>
        </View>
    );
}

const BasicUsage = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '/' + currentDate.getDate().toString().padStart(2, '0');
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    return (
        <View>
            <DatePicker mode='calendar'
                style={styles.datePicker}
                selected={selectedDate}
                onSelectedChange={date => setSelectedDate(date)}
                options={{
                    backgroundColor: 'black',
                    textHeaderColor: 'white',
                    textDefaultColor: 'white',
                    selectedTextColor: 'black',
                    mainColor: 'white',
                    textSecondaryColor: 'white',
                    borderColor: 'white',
                }}
            />
            <TouchableOpacity style={styles.header}>
                <Text style={styles.buttonText}>{selectedDate}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function Monitoring() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.headContainer}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Board</Text>
                    </View>
                    <SelectOptions />
                    <BasicUsage />
                    <View style={styles.dataContainer}>
                        <View style={styles.inContainer}>
                            <Text style={{ color: 'white', fontSize: 20 }}>System Production</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>0 kWh</Text>
                        </View>
                        <Progress.Bar progress={0.9942} width={350} height={30} color={'blue'} unfilledColor={'green'} borderColor={'black'} style={{ alignSelf: 'center' }} />
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>99.42%</Text>
                            <Text style={styles.rowText}>0.58%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>Self-consumption</Text>
                            <Text style={styles.rowText}>Export</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>49620.60 kWh</Text>
                            <Text style={styles.rowText}>287.29 kWh</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.inContainer}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Consumption</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>101275.59 kWh</Text>
                        </View>
                        <Progress.Bar progress={0.49} width={350} height={30} color={'blue'} unfilledColor={'red'} borderColor={'black'} style={{ alignSelf: 'center' }} />
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>49.00%</Text>
                            <Text style={styles.rowText}>51.00%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>Self-consumption</Text>
                            <Text style={styles.rowText}>Import</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>49620.60 kWh</Text>
                            <Text style={styles.rowText}>51654.99 kWh</Text>
                        </TouchableOpacity>
                        <View style={styles.chartContainer}>
                            <LineChart
                                data={data2}
                                width={Dimensions.get("window").width - 7}
                                height={300}
                                yAxisInterval={1}
                                chartConfig={{
                                    backgroundColor: "black",
                                    // backgroundGradientFrom: "#fb8c00",
                                    // backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: "0",
                                        strokeWidth: "1",
                                        stroke: "white"
                                    }

                                }}
                                bezier
                                style={{
                                    marginTop: 4,
                                    marginBottom: 4,
                                    marginRight: 7,
                                    borderRadius: 16
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    chartContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        // margin: 5,
        backgroundColor: "black",
        alignSelf: 'center'
    },
    headContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 2,
        backgroundColor: "black",
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    tableContainerData: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: 'gray',
        borderLeftColor: 'gray',
        borderRightColor: 'gray',
        paddingBottom: 5,

    },
    tableContainerRow: {
        flexDirection: 'row',

    },
    picker: {
        width: 200,
        height: 50,
        backgroundColor: 'gray',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        color: 'white'
    },
    datePicker: {
        width: 300,
        alignSelf: 'center'
    },
    header: {
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    inContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 2,
        backgroundColor: "black",
        //flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5
    },
    rowText: {
        fontSize: 16,
        color: 'white',
        width: '49%',
        textAlign: 'center',
    },
});