import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const MonthYearExample = () => {
    const currentDate = new Date();
    const yearMonth = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' }).replace(/\//g, ' ');
    const [date, setDate] = useState(yearMonth);
    
    return (
        <View style={styles.dateContainer}>
            <DatePicker
                style={styles.datePicker}
                mode="monthYear"
                selected = {date}
                onMonthYearChange={selectedDate => setDate(selectedDate)}
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
                <Text style={styles.buttonText}>{date}</Text>
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Date</Text>
                    </View>
                    <MonthYearExample />
                    <TouchableOpacity style={styles.header}>
                        <Text style={styles.rowText}>รายการ</Text>
                        <Text style={styles.rowText}>พลังงานไฟฟ้า(kWh)</Text>
                        <Text style={styles.rowText}>อัตราค่าพลังงานไฟฟ้า(Baht/kWh)</Text>
                        <Text style={styles.rowText}>ค่าพลังงานไฟฟ้ารวม(Baht)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>หน่วยที่ 0 - 150</Text>
                        <Text style={styles.rowText}>150</Text>
                        <Text style={styles.rowText}>3.2484</Text>
                        <Text style={styles.rowText}>487.26</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>หน่วยที่ 151 - 400</Text>
                        <Text style={styles.rowText}>250</Text>
                        <Text style={styles.rowText}>4.2218</Text>
                        <Text style={styles.rowText}>1,055.45</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>หน่วยที่ 401 ขึ้นไป</Text>
                        <Text style={styles.rowText}>4,567.398</Text>
                        <Text style={styles.rowText}>4.4217</Text>
                        <Text style={styles.rowText}>20,195.66</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>รวมทั้งหมด</Text>
                        <Text style={styles.rowText}>4,967.398</Text>
                        <Text style={styles.rowText}>-</Text>
                        <Text style={styles.rowText}>21,105.1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.header}>
                        <Text style={styles.rowText}>ค่าพลังงานไฟฟ้ารวม</Text>
                        <Text style={styles.rowText}>21,105.1</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>อัตราค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                        <Text style={styles.rowText}>0.9343</Text>
                        <Text style={styles.rowText}>บาท/กิโลวัตต์-ชั่วโมง</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                        <Text style={styles.rowText}>4,641.04</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่ารีแอดทีฟเพาเวอร์สูงสุด (kVar)</Text>
                        <Text style={styles.rowText}>0</Text>
                        <Text style={styles.rowText}>กิโลวาร์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่าแอดทีฟเพาเวอร์สูงสุด (kW)</Text>
                        <Text style={styles.rowText}>31.05</Text>
                        <Text style={styles.rowText}>กิโลวัตต์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>รีแอดทีฟเพาเวอร์ส่วนที่เกิน</Text>
                        <Text style={styles.rowText}>0</Text>
                        <Text style={styles.rowText}>กิโลวาร์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>อัตรา (PRPn)</Text>
                        <Text style={styles.rowText}>0</Text>
                        <Text style={styles.rowText}>บาท/กิโลวาร์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่าเพาเวอร์แฟตเตอร์ (RPn)</Text>
                        <Text style={styles.rowText}>0</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่าบริการ (SvC)</Text>
                        <Text style={styles.rowText}>46.16</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>รวมเงินค่าไฟฟ้า</Text>
                        <Text style={styles.rowText}>25,885.73</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ส่วนลด</Text>
                        <Text style={styles.rowText}>0</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>รวมเงินค่าไฟฟ้าหลังหักส่วนลด</Text>
                        <Text style={styles.rowText}>25,885.73</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>ค่าภาษีมูลค่าเพิ่ม 7% (VAT)</Text>
                        <Text style={styles.rowText}>1812.00</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tail}>
                        <Text style={styles.rowText}>รวมเป็นเงินทั้งสิ้น</Text>
                        <Text style={styles.rowText}>27697.73</Text>
                        <Text style={styles.rowText}>บาท</Text>
                    </TouchableOpacity>
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
    dateContainer: {
        flex: 1,
        width: '98%',
        height:370,
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
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    picker: {
        width: 200,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    row: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    tail: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    rowText: {
        fontSize: 16,
        color: 'white',
        width: '24%',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    datePicker: {
        width: 300,
        alignSelf:'center'
      },
});