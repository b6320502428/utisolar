import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

const data = [0, 0, 0, 0, 0, 0, 2.7, 9.2, 17.1, 5.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];

const horizontalData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

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

export default function Dashboard() {
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
      <ScrollView style={styles.container}>
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='solar-panel-large' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 18 }}>Overview</Text>
          </View>
          <View style={styles.tableContainerRow}>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>Current Power</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>0.000 kW</Text>
            </View>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>Energy Today</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>34.541 kWh</Text>
            </View>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>Energy This Month</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>3,434.714 kWh</Text>
            </View>
          </View>
          <View style={styles.tableContainerRow}>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>30 Day Min</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>34.541 kWh</Text>
            </View>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>30 Day Average</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>180.774 kWh</Text>
            </View>
            <View style={styles.tableContainerData}>
              <Text style={{ color: 'white', fontSize: 14 }}>30 Day Max</Text>
              <Text style={{ color: 'white', fontSize: 14 }}>225.29 kWh</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='solar-panel-large' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 18 }}>Energy Output</Text>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: horizontalData,
                datasets: [
                  {
                    data: data

                  }
                ]
              }}
              width={Dimensions.get("window").width - 7}
              height={300}
              yAxisSuffix="kW"
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
                  r: "4",
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
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='solar-panel-large' size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 18 }}>Production & Consume (kW)</Text>
          </View>
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
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='molecule-co2' size={30} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 20 }}>ค่า CO2E : 1,346.41 kg</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='dolly' size={30} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 20 }}>ลดค่าใช้จ่าย : 0.000 บาท</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.headContainer}>
            <Icon name='tree' size={30} color="white" style={{ marginRight: 5, marginLeft: 5 }} />
            <Text style={{ color: 'white', fontSize: 20 }}>ลดการตัดต้นไม้ : 40.19 ต้น</Text>
          </View>
        </View>
      </ScrollView>
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
});