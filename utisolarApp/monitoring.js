import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import * as Progress from 'react-native-progress';
import { LineChart } from 'react-native-chart-kit';

export default function Monitoring() {

    const [site, setSite] = useState({});
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    const formattedDate2 = currentDate.getDate().toString().padStart(2, '0') + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getFullYear();
    const [displayDate, setDisplayDate] = useState(formattedDate2);
    const [selectedValue, setSelectedValue] = useState('1');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [monitoringDate, setMonitoringDate] = useState(formattedDate2);
    const [monitoringType, setMonitoringType] = useState('1');

    const [sumConsumption, setSumConsumption] = useState(0);
    const [sumProduct, setSumProduct] = useState(0);
    const [sumSelfConsumption, setSumSelfConsumption] = useState(0);
    const [sumExport, setSumExport] = useState(0);
    const [sumImport, setSumImport] = useState(0);
    const [percentExport, setPercentExport] = useState(0);
    const [percentImport, setPercentImport] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [showLine1, setShowLine1] = useState(true);
    const [showLine2, setShowLine2] = useState(true);
    const [showLine3, setShowLine3] = useState(true);

    const updateData = () => {
        return {
            labels: chartData.labels,
            datasets: [
                {
                    data: chartData.datasets[0].data,
                    color: showLine1 ? chartData.datasets[0].color : () => 'transparent',
                    strokeWidth: 2,
                },
                {
                    data: chartData.datasets[1].data,
                    color: showLine2 ? chartData.datasets[1].color : () => 'transparent',
                    strokeWidth: 2,
                },
                {
                    data: chartData.datasets[2].data,
                    color: showLine3 ? chartData.datasets[2].color : () => 'transparent',
                    strokeWidth: 2,
                }
            ],
        };
    };

    const handleSelectDate = () => {
        setIsHidden(!isHidden);
    };

    function SumData(jsonData) {
        let totalConsumption = 0;
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                totalConsumption += jsonData[i][1];
            }
        }
        totalConsumption = totalConsumption / 1000;
        setSumConsumption(totalConsumption.toFixed(2));
        let totalProduct = 0;
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                totalProduct += jsonData[i][2];
            }
        }
        totalProduct = totalProduct / 1000;
        setSumProduct(totalProduct.toFixed(2));
        let totalSelfConsumption = 0;
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                totalSelfConsumption += jsonData[i][3];
            }
        }
        totalSelfConsumption = totalSelfConsumption / 1000;
        setSumSelfConsumption(totalSelfConsumption.toFixed(2));
        let totalExport = 0;
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                totalExport += jsonData[i][4];
            }
        }
        totalExport = totalExport / 1000;
        setSumExport(totalExport.toFixed(2));
        let totalImport = 0;
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                totalImport += jsonData[i][5];
            }
        }
        totalImport = totalImport / 1000;
        setSumImport(totalImport.toFixed(2));
        if (totalProduct !== 0 && totalConsumption !== 0) {
            setPercentExport(((totalSelfConsumption / totalProduct) * 100).toFixed(2))
            setPercentImport(((totalSelfConsumption / totalConsumption) * 100).toFixed(2))
        }
        else {
            setPercentExport(0)
            setPercentImport(0)
        }
    }

    const handleSubmit = () => {

        let command;
        switch (selectedValue) {
            case '1':
                command = "getsumeachhourbyday";
                break;
            case '2':
                command = "getsumeachdaybyweek";
                break;
            case '3':
                command = "getsumeachdaybymonth";
                break;
            case '4':
                command = "getsumeachmonthbyyear";
                break;
            default:
                command = "getsumeachhourbyday";
        }
        fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/' + command + '/' + selectedDate + '/' + parseInt(site.idSite), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((json) => {
                if (!(Array.isArray(json) && json.length === 0)) {
                    if (command === "getsumeachdaybyweek") {
                        setChartData({
                            labels: json.map((_, i) => {
                                if (i % 2 === 0) {
                                    const date = new Date(selectedDate);
                                    date.setDate(date.getDate() + i);
                                    const day = date.toISOString().slice(0, 10);
                                    const parts = day.split('-');
                                    const newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                                    return `${newDateStr}`;
                                }
                                return '';
                            }),
                            datasets: [
                                {
                                    data: json.map((item) => item[2] / 1000),
                                    color: (opacity = 1) => `rgba(44, 193, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[3] / 1000),
                                    color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[1] / 1000),
                                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                            ]
                        });
                    }
                    else if (command === "getsumeachmonthbyyear") {
                        setChartData({
                            labels: json.map((item, i) => {
                                if (i % 2 === 0) {
                                    const date = new Date(item[0]);
                                    date.setMonth(date.getMonth());
                                    const month = date.toLocaleString('default', { month: 'long' });
                                    return `${month}`;
                                }
                                return '';
                            }),
                            datasets: [
                                {
                                    data: json.map((item) => item[2] / 1000),
                                    color: (opacity = 1) => `rgba(44, 193, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[3] / 1000),
                                    color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[1] / 1000),
                                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                            ]
                        });
                    }
                    else if (command === "getsumeachdaybymonth") {
                        setChartData({
                            labels: json.map((item, i) => {
                                if (i % 2 === 0) {
                                    const date = new Date(item[0]);
                                    date.setDate(date.getDate());
                                    const day = date.getDate();
                                    return `${day}`;
                                }
                                return '';
                            }),
                            datasets: [
                                {
                                    data: json.map((item) => item[2] / 1000),
                                    color: (opacity = 1) => `rgba(44, 193, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[3] / 1000),
                                    color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[1] / 1000),
                                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                            ]
                        });
                    }
                    else {
                        setChartData({
                            labels: json.map((_, i) => {
                                if (i % 2 === 0) {
                                    return `${i + 1}`;
                                }
                                return '';
                            }),
                            datasets: [
                                {
                                    data: json.map((item) => item[2] / 1000),
                                    color: (opacity = 1) => `rgba(44, 193, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[3] / 1000),
                                    color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                                    strokeWidth: 2,
                                },
                                {
                                    data: json.map((item) => item[1] / 1000),
                                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                    strokeWidth: 2,
                                },
                            ]
                        });
                    }
                    SumData(json)
                    const parts = selectedDate.split('-');
                    const newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                    setMonitoringDate(newDateStr)
                }
                else {
                    setChartData({
                        labels: [],
                        datasets: []
                    });
                    SumData(0)
                    const parts = selectedDate.split('-');
                    const newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                    setMonitoringDate(newDateStr)
                }
            })
            .catch(error => console.error(error));
        setMonitoringType(selectedValue)
        setIsHidden(true)
    }

    useEffect(() => {
        async function fetchSite() {
            await AsyncStorage.getItem('User')
                .then((u) => {
                    const user = JSON.parse(u);
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
                                    fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/getsumeachhourbyday/' + selectedDate + '/' + parseInt(json.id.idSite), {
                                        method: 'GET',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                    })
                                        .then(response => response.json())
                                        .then((json) => {
                                            if (!(Array.isArray(json) && json.length === 0)) {
                                                setChartData({
                                                    labels: json.map((_, i) => {
                                                        if (i % 2 === 0) {
                                                            return `${i + 1}`;
                                                        }
                                                        return '';
                                                    }),
                                                    datasets: [
                                                        {
                                                            data: json.map((item) => item[2] / 1000),
                                                            color: (opacity = 1) => `rgba(44, 193, 0, ${opacity})`,
                                                            strokeWidth: 2,
                                                        },
                                                        {
                                                            data: json.map((item) => item[3] / 1000),
                                                            color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                                                            strokeWidth: 2,
                                                        },
                                                        {
                                                            data: json.map((item) => item[1] / 1000),
                                                            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                                            strokeWidth: 2,
                                                        },
                                                    ],
                                                });
                                                SumData(json)
                                            }
                                        })
                                        .catch(error => console.error(error));
                                })
                                .catch(error => console.error(error));
                        })
                        .catch(error => console.error(error));
                });
        }
        fetchSite()
    }, []);

    const SelectOptions = () => {
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

        return (
            <View>
                <DatePicker mode='calendar'
                    style={styles.datePicker}
                    selected={selectedDate}
                    current={selectedDate}
                    onSelectedChange={date => {
                        const newDate = date.replace(/\//g, '-');
                        if (newDate !== selectedDate) {
                            setIsHidden(true)
                        }
                        setSelectedDate(newDate);
                        const parts = newDate.split('-');
                        const newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
                        setDisplayDate(newDateStr)
                    }}
                    options={{
                        backgroundColor: '#E5E5E5',
                        textHeaderColor: 'black',
                        textDefaultColor: 'black',
                        selectedTextColor: 'white',
                        mainColor: 'black',
                        textSecondaryColor: 'black',
                        borderColor: 'black',
                    }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.dataContainer}>
                    <View style={styles.headContainer}>
                        <AntDesign name="dashboard" size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }}/>
                        <Text style={{ color: 'white', fontSize: 20 }}>Board
                            {site !== null ? (
                                <Text style={styles.textData}> ({site.sitename})</Text>
                            ) : (
                                <ActivityIndicator />
                            )}</Text>
                    </View>
                    <SelectOptions />
                    <TouchableOpacity style={styles.button} onPress={handleSelectDate}>
                        <Text style={styles.buttonText}>Select Date ({displayDate})</Text>
                    </TouchableOpacity>
                    {!isHidden && (
                        <BasicUsage />
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center' }}>Monitoring On {monitoringDate} 
                        {monitoringType === '1' && ' Daily'}
                        {monitoringType === '2' && ' Weekly'}
                        {monitoringType === '3' && ' Monthly'}
                        {monitoringType === '4' && ' Yearly'}
                        {!['1', '2', '3', '4'].includes(monitoringType) && ' Day'}</Text>
                    <View style={styles.solutionContainer}>
                        <View style={styles.inContainer}>
                            <Text style={{ color: 'black', fontSize: 20 }}>System Production</Text>
                            <Text style={{ color: 'green', fontSize: 20 }}>{sumProduct} kWh</Text>
                        </View>
                        <Progress.Bar progress={percentExport / 100} width={350} height={30} color={'blue'} unfilledColor={'green'} borderColor={'black'} style={{ alignSelf: 'center', margin: 10 }} />
                        <TouchableOpacity style={styles.row}>
                            <Text style={[styles.rowText, { color: 'blue' }]}>{percentExport}%</Text>
                            <Text style={[styles.rowText, { color: 'green' }]}>{(100 - percentExport).toFixed(2)}%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>Self-consumption</Text>
                            <Text style={styles.rowText}>Export</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={[styles.rowText, { color: 'blue' }]}>{sumSelfConsumption} kWh</Text>
                            <Text style={[styles.rowText, { color: 'green' }]}>{sumExport} kWh</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.solutionContainer}>
                        <View style={styles.inContainer}>
                            <Text style={{ color: 'black', fontSize: 20 }}>Consumption</Text>
                            <Text style={{ color: 'red', fontSize: 20 }}>{sumConsumption} kWh</Text>
                        </View>
                        <Progress.Bar progress={percentImport / 100} width={350} height={30} color={'blue'} unfilledColor={'red'} borderColor={'black'} style={{ alignSelf: 'center', margin: 10 }} />
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>{percentImport}%</Text>
                            <Text style={styles.rowText}>{(100 - percentImport).toFixed(2)}%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>Self-consumption</Text>
                            <Text style={styles.rowText}>Import</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowText}>{sumSelfConsumption} kWh</Text>
                            <Text style={styles.rowText}>{sumImport} kWh</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.chartContainer}>
                        {chartData.datasets.length > 0 ? (
                            <View>
                                <View style={styles.headContainer}>
                                <MaterialCommunityIcons name='chart-bell-curve' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
                                    <Text style={{ color: 'white', fontSize: 20 }}>Summarize (kWh)</Text>
                                </View>
                                <LineChart
                                    data={updateData()}
                                    width={Dimensions.get("window").width - 7}
                                    height={220}
                                    yAxisInterval={100}
                                    fromZero={true}
                                    chartConfig={{
                                        fillShadowGradientFrom: "#FFFFFF",
                                        fillShadowGradientFromOpacity: 0,
                                        fillShadowGradientTo: "#FFFFFF",
                                        fillShadowGradientToOpacity: 0,
                                        backgroundGradientFrom: "#FFFFFF",
                                        backgroundGradientFromOpacity: 0,
                                        backgroundGradientTo: "#FFFFFF",
                                        backgroundGradientToOpacity: 0.5,
                                        decimalPlaces: 2,
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                        propsForDots: {
                                            r: "0",
                                            strokeWidth: "1",
                                            stroke: "black",
                                        },
                                        contentInset: { left: -20, right: 10, top: 10, bottom: 10 },
                                        barPercentage: 0.5
                                    }}
                                    bezier
                                    style={{
                                        marginTop: 5,
                                        borderRadius: 16,
                                    }}
                                />
                                <View style={[styles.legendContainer]}>
                                    <View style={[styles.legendContainer]}>
                                        <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine1 ? 1 : 0.1 }]} onPress={() => setShowLine1(!showLine1)}>
                                            <View style={{ backgroundColor: 'rgb(44, 193, 0)', width: 14, height: 14, alignSelf: 'center' }}></View>
                                            <Text style={[styles.legendText, { color: 'rgb(44, 193, 0)' }]}> System Production</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.legendContainer]}>
                                        <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine2 ? 1 : 0.1 }]} onPress={() => setShowLine2(!showLine2)}>
                                            <View style={{ backgroundColor: 'rgb(40, 170, 231)', width: 14, height: 14, alignSelf: 'center' }}></View>
                                            <Text style={[styles.legendText, { color: 'rgb(40, 170, 231)' }]}> Self-consumption</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.legendContainer]}>
                                        <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine3 ? 1 : 0.1 }]} onPress={() => setShowLine3(!showLine3)}>
                                            <View style={{ backgroundColor: 'rgb(255, 0, 0)', width: 14, height: 14, alignSelf: 'center' }}></View>
                                            <Text style={[styles.legendText, { color: 'rgb(255, 0, 0)' }]}> Consumption</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>ไม่พบข้อมูล</Text>
                        )}
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>...</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

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
        backgroundColor: "white",
        alignSelf: 'center'
    },
    solutionContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#E5E5E5",
        alignSelf: 'center'
    },
    chartContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        backgroundColor: "#E5E5E5",
        alignSelf: 'center',
        margin: 5
    },
    headContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        backgroundColor: "#5800BB",
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
        backgroundColor: '#E5E5E5',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        color: 'black',
        marginTop: 10
    },
    datePicker: {
        width: 300,
        alignSelf: 'center',
        margin: 10
    },
    button: {
        width: '50%',
        borderRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "#E5E5E5",
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        width: '100%',
        textAlign: 'center',
    },
    inContainer: {
        flex: 1,
        width: '98%',
        borderRadius: 8,
        marginTop: 2,
        backgroundColor: "#E5E5E5",
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
        width: '49%',
        textAlign: 'center',
    },
    legendContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    legendText: {
        fontSize: 12,
    },
});