import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default function Dashboard() {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [site, setSite] = useState({});
  const [currentPower, setCurrentPower] = useState(0);
  const [energyToday, setEnergyToday] = useState(0);
  const [energyThisMonth, setEnergyThisMonth] = useState(0);
  const [min30day, setMin30day] = useState(0);
  const [max30day, setMax30day] = useState(0);
  const [avg30day, setAvg30day] = useState(0);
  const [hourConToday, setHourConToday] = useState({
    labels: [],
    datasets: [],
  });
  const [hourSolutionToday, setHourSolutionToday] = useState({
    labels: [],
    datasets: [],
  });

  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(true);
  const [showLine3, setShowLine3] = useState(true);
  const [showLine4, setShowLine4] = useState(true);
  const [showLine5, setShowLine5] = useState(true);

  const updateData = () => {
    return {
      labels: hourSolutionToday.labels,
      datasets: [
        {
          data: hourSolutionToday.datasets[0].data,
          color: showLine1 ? hourSolutionToday.datasets[0].color : () => 'transparent',
          strokeWidth: 2,
        },
        {
          data: hourSolutionToday.datasets[1].data,
          color: showLine2 ? hourSolutionToday.datasets[1].color : () => 'transparent',
          strokeWidth: 2,
        },
        {
          data: hourSolutionToday.datasets[2].data,
          color: showLine3 ? hourSolutionToday.datasets[2].color : () => 'transparent',
          strokeWidth: 2,
        },
        {
          data: hourSolutionToday.datasets[3].data,
          color: showLine4 ? hourSolutionToday.datasets[3].color : () => 'transparent',
          strokeWidth: 2,
        },
        {
          data: hourSolutionToday.datasets[4].data,
          color: showLine5 ? hourSolutionToday.datasets[4].color : () => 'transparent',
          strokeWidth: 2,
        },
      ],
    };
  };

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
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getcurrentpower/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      setCurrentPower(json / 1000);
                    })
                    .catch(error => {
                      setError(error)
                      setIsLoading(false)
                    });
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getenergytoday/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      setEnergyToday(json / 1000);
                    })
                    .catch(error => {
                      setError(error)
                      setIsLoading(false)
                    });
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getenergythismonth/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      setEnergyThisMonth(json / 1000);
                    })
                    .catch(error => {
                      setError(error)
                      setIsLoading(false)
                    });
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getsolutionthismonth/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      setMin30day(json[0][2] / 1000);
                      setMax30day(json[0][0] / 1000);
                      setAvg30day(json[0][1] / 1000);
                    })
                    .catch(error => {
                      setError(error)
                      setIsLoading(false)
                    });
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/gethourcontoday/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      if (!(Array.isArray(json) && json.length === 0)) {
                        setHourConToday({
                          labels: json.map((_, i) => {
                            if (i % 2 === 0) {
                              return `${i}`;
                            }
                            return '';
                          }),
                          datasets: [
                            {
                              data: json.map((item) => item[1] / 1000),
                            },
                          ],
                        });
                      }
                    })
                    .catch(error => {
                      setError(error)
                      setIsLoading(false)
                    });
                  fetch('http://139.5.146.172:8080/api-1.0/api/tblpowers/gethoursolutiontoday/' + parseInt(json.id.idSite), {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                    .then(response => response.json())
                    .then((json) => {
                      if (!(Array.isArray(json) && json.length === 0)) {
                        setHourSolutionToday({
                          labels: json.map((_, i) => {
                            const hours = Math.floor(i * 15 / 60);
                            const minutes = (i * 15 % 60);
                            if (hours % 2 === 0 && minutes === 0) {
                              return `${hours}`;
                            }
                            else {
                              return '';
                            }
                          }),
                          datasets: [
                            {
                              data: json.map((item) => item[1] / 1000),
                              color: (opacity = 1) => `rgba(40, 170, 231, ${opacity})`,
                              strokeWidth: 2,
                            },
                            {
                              data: json.map((item) => item[2] / 1000),
                              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                              strokeWidth: 2,
                            },
                            {
                              data: json.map((item) => item[3] / 1000),
                              color: (opacity = 1) => `rgba(31, 255, 0, ${opacity})`,
                              strokeWidth: 2,
                            },
                            {
                              data: json.map((item) => item[4] / 1000),
                              color: (opacity = 1) => `rgba(255, 189, 0, ${opacity})`,
                              strokeWidth: 2,
                            },
                            {
                              data: json.map((item) => item[5] / 1000),
                              color: (opacity = 1) => `rgba(135, 0, 229, ${opacity})`,
                              strokeWidth: 2,
                            },
                          ],
                        });
                      }
                      else {
                        setHourSolutionToday({
                          labels: [],
                          datasets: [],
                        })
                      }
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
        <ScrollView style={styles.container}>
          <View style={styles.dataContainer}>
            <View style={[styles.headContainer, { backgroundColor: "#8bc34a" }]}>
              <MaterialCommunityIcons name='solar-panel-large' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 20 }}>{site !== null ? (
                <Text style={styles.textData}>{site.sitename}</Text>
              ) : (
                <ActivityIndicator />
              )}</Text>
            </View>
            <View style={[styles.headContainer, { backgroundColor: "#2660C5" }]}>
              <MaterialCommunityIcons name='solar-power' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 20 }}>Overview</Text>
            </View>
            <View style={styles.tableContainerRow}>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Current Power</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{currentPower.toFixed(3)} kW</Text>
              </View>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Energy Today</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{energyToday.toFixed(3)} kWh</Text>
              </View>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Energy This Month</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{energyThisMonth.toFixed(3)} kWh</Text>
              </View>
            </View>
            <View style={styles.tableContainerRow}>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>30 Day Min</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{min30day.toFixed(3)} kWh</Text>
              </View>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>30 Day Average</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{avg30day.toFixed(3)} kWh</Text>
              </View>
              <View style={styles.tableContainerData}>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>30 Day Max</Text>
                <Text style={{ color: '#3f51b5', fontSize: 14 }}>{max30day.toFixed(3)} kWh</Text>
              </View>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={[styles.headContainer, { backgroundColor: "#5800BB" }]}>
              <Ionicons name='md-bar-chart-outline' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 20 }}>Energy Output (Consumption(kWh))</Text>
            </View>
            <View style={styles.chartContainer}>
              {hourConToday.datasets.length > 0 ? (
                <BarChart
                  data={hourConToday}
                  width={Dimensions.get("window").width - 7}
                  height={220}
                  fromZero={true}
                  yAxisInterval={1}
                  chartConfig={{
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientFromOpacity: 1,
                    backgroundGradientTo: "#FFFFFF",
                    backgroundGradientToOpacity: 1,
                    fillShadowGradientFrom: "#2491FF",
                    fillShadowGradientFromOpacity: 1,
                    fillShadowGradientTo: "#2491FF",
                    fillShadowGradientToOpacity: 1,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(36, 145, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 10,
                    },
                    barPercentage: 0.3,
                  }}
                  style={{
                    marginTop: 5,
                    borderRadius: 16,
                  }}
                  showBarTops={false}
                />
              ) : (
                <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>ไม่มีข้อมูล</Text>
              )}
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={[styles.headContainer, { backgroundColor: "#E92CE6" }]}>
              <MaterialCommunityIcons name='chart-bell-curve' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'white', fontSize: 20 }}>Production & Consume (kW)</Text>
            </View>
            <View style={styles.chartContainer}>
              {hourSolutionToday.datasets.length > 0 ? (
                <View>
                  <Text style={{ paddingLeft: 45 }}>Value</Text>
                  <LineChart
                    data={updateData()}
                    width={Dimensions.get("window").width}
                    height={330}
                    yAxisInterval={1000}
                    fromZero={true}
                    chartConfig={{
                      fillShadowGradientFrom: "#FFFFFF",
                      fillShadowGradientFromOpacity: 0,
                      fillShadowGradientTo: "#FFFFFF",
                      fillShadowGradientToOpacity: 0,
                      backgroundGradientFrom: "#FFFFFF",
                      backgroundGradientFromOpacity: 1,
                      backgroundGradientTo: "#FFFFFF",
                      backgroundGradientToOpacity: 1,
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "0",
                        strokeWidth: "1",
                        stroke: "#000000",
                      },
                    }}
                    bezier
                    style={{
                      borderRadius: 10,
                    }}
                  />
                  <Text style={{ paddingRight: 5, paddingBottom: 5, alignSelf: 'flex-end' }}>Hour</Text>
                  <View style={[styles.legendContainer]}>
                    <View style={[styles.legendContainer]}>
                      <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine1 ? 1 : 0.1 }]} onPress={() => setShowLine1(!showLine1)}>
                        <View style={{ backgroundColor: 'rgb(40, 170, 231)', width: 14, height: 14, alignSelf: 'center' }}></View>
                        <Text style={[styles.legendText, { color: 'rgb(40, 170, 231)' }]}> Consumption</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.legendContainer]}>
                      <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine2 ? 1 : 0.1 }]} onPress={() => setShowLine2(!showLine2)}>
                        <View style={{ backgroundColor: 'rgb(0, 0, 0)', width: 14, height: 14, alignSelf: 'center' }}></View>
                        <Text style={[styles.legendText, { color: 'rgb(0, 0, 0)' }]}> Feedin</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.legendContainer]}>
                      <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine3 ? 1 : 0.1 }]} onPress={() => setShowLine3(!showLine3)}>
                        <View style={{ backgroundColor: 'rgb(31, 255, 0)', width: 14, height: 14, alignSelf: 'center' }}></View>
                        <Text style={[styles.legendText, { color: 'rgb(31, 255, 0)' }]}> Production</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.legendContainer}>
                    <View style={[styles.legendContainer]}>
                      <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine4 ? 1 : 0.1 }]} onPress={() => setShowLine4(!showLine4)}>
                        <View style={{ backgroundColor: 'rgb(255, 189, 0)', width: 14, height: 14, alignSelf: 'center' }}></View>
                        <Text style={[styles.legendText, { color: 'rgb(255, 189, 0)' }]}> Purchesed</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.legendContainer]}>
                      <TouchableOpacity activeOpacity={1} style={[styles.legendContainer, { opacity: showLine5 ? 1 : 0.1 }]} onPress={() => setShowLine5(!showLine5)}>
                        <View style={{ backgroundColor: 'rgb(135, 0, 229)', width: 14, height: 14, alignSelf: 'center' }}></View>
                        <Text style={[styles.legendText, { color: 'rgb(135, 0, 229)' }]}> selfConsumption</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>ไม่มีข้อมูล</Text>
              )}

            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.headContainer}>
              <MaterialCommunityIcons name='molecule-co2' size={30} color="black" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'black', fontSize: 20 }}>ค่า CO2e : {(energyThisMonth * 0.392).toFixed(2)} kg</Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.headContainer}>
              <MaterialCommunityIcons name='dolly' size={30} color="black" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'black', fontSize: 20 }}>ลดค่าใช้จ่าย : 0.000 บาท</Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.headContainer}>
              <MaterialCommunityIcons name='tree' size={30} color="black" style={{ marginRight: 5, marginLeft: 5 }} />
              <Text style={{ color: 'black', fontSize: 20 }}>ลดการตัดต้นไม้ : {(energyThisMonth * 0.0117).toFixed(2)} ต้น</Text>
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#E5E5E5'
  },
  dataContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: "white",
    alignSelf: 'center'
  },
  errorContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginTop: 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: "#E5E5E5"
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  headContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  tableContainerData: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 5
  },
  tableContainerRow: {
    flexDirection: 'row'
  },
  legendContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendText: {
    fontSize: 14,
  },
});