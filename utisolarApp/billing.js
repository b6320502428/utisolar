import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-modern-datepicker';
import { Fontisto } from '@expo/vector-icons';

export default function Billing() {

    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + ' ' + (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const [date, setDate] = useState(formattedDate);
    const formattedDate2 = (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getFullYear()
    const [displayDate, setDisplayDate] = useState(formattedDate2);
    const [billingDate, setBillingDate] = useState(null);
    const [isHidden, setIsHidden] = useState(true);
    const [site, setSite] = useState({});
    const [billingType, setBillingType] = useState({});
    const [ft, setFt] = useState(0);                    // FT Rate
    const [maxOnPeak1, setMaxOnPeak1] = useState(0);    // maxKWDemand onPeak (Mon-Fri (day))
    const [maxOnPeak2, setMaxOnPeak2] = useState(0);    // maxKVarDemand onPeak (Mon-Fri (day))
    const [sumMonth, setSumMonth] = useState(0);        // sumKwh for normel bill
    const [sumOnPeak, setSumOnPeak] = useState(0);      // sumKwh onPeak (Mon-Fri (day)) for TOU bill
    const [maxOffPeak1, setMaxOffPeak1] = useState(0);  // maxKWDemand offPeak (Mon-Fri (night)) for TOU bill
    const [maxOffPeak2, setMaxOffPeak2] = useState(0);  // maxKWDemand offPeak for TOU bill
    const [sumOffPeak1, setSumOffPeak1] = useState(0);  // sumKwh offPeak (Mon-Fri (night)) for TOU bill
    const [sumOffPeak2, setSumOffPeak2] = useState(0);  // sumKwh offPeak (Sat, Sun, Holiday)  for TOU bill

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
                            })
                            .catch(error => console.error(error));
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    async function fetchData() {
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
                        fetch('http://139.5.146.172:8080/api-1.0/api/tblsitetypes/getbyidsite/' + parseInt(json.id.idSite), {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(response => response.json())
                            .then((json) => {
                                fetch('http://139.5.146.172:8080/api-1.0/api/tblbillingtypes/getbyid/' + parseInt(json.id.idBilingType), {
                                    method: 'GET',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                })
                                    .then(response => response.json())
                                    .then((json) => {
                                        setBillingType(json.id)
                                        const newDate = date.replace(/ /g, '-');
                                        const newDate2 = newDate + '-01';
                                        fetch('http://139.5.146.172:8080/api-1.0/api/tblfts/getbytime/' + newDate, {
                                            method: 'GET',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                        })
                                            .then(response => response.json())
                                            .then((json) => {
                                                setFt(json.id.rate)
                                            })
                                            .catch(error => {
                                                fetch('http://139.5.146.172:8080/api-1.0/api/tblfts/getlasttime', {
                                                    method: 'GET',
                                                    headers: {
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json',
                                                    },
                                                })
                                                    .then(response => response.json())
                                                    .then((json) => {
                                                        setFt(json.id.rate)
                                                    })
                                                    .catch(error => console.error(error));
                                            });
                                        fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getmaxonpeak1/' + newDate2 + '/' + parseInt(site.idSite), {
                                            method: 'GET',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                        })
                                            .then(response => response.json())
                                            .then((json) => {
                                                setMaxOnPeak1(json / 1000)
                                            })
                                            .catch(error => setMaxOnPeak1(0));
                                        fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getmaxonpeak2/' + newDate2 + '/' + parseInt(site.idSite), {
                                            method: 'GET',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                        })
                                            .then(response => response.json())
                                            .then((json) => {
                                                setMaxOnPeak2(json / 1000)
                                            })
                                            .catch(error => setMaxOnPeak2(0));
                                        if (json.id.peatype === "1112" || json.id.peatype === "1122" || json.id.peatype === "2112" || json.id.peatype === "2122") {
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/getsummonth/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setSumMonth(json / 1000)
                                                })
                                                .catch(error => setSumMonth(0));
                                        }
                                        else {
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getmaxoffpeak1/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setMaxOffPeak1(json / 1000)
                                                })
                                                .catch(error => setMaxOffPeak1(0));
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergymonitors/getmaxoffpeak2/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setMaxOffPeak2(json / 1000)
                                                })
                                                .catch(error => setMaxOffPeak2(0));
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/getsumonpeak/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setSumOnPeak(json / 1000)
                                                })
                                                .catch(error => setSumOnPeak(0));
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/getsumoffpeak1/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setSumOffPeak1(json / 1000)
                                                })
                                                .catch(error => setSumOffPeak1(0));
                                            fetch('http://139.5.146.172:8080/api-1.0/api/tblenergys/getsumoffpeak2/' + newDate2 + '/' + parseInt(site.idSite), {
                                                method: 'GET',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => response.json())
                                                .then((json) => {
                                                    setSumOffPeak2(json / 1000)
                                                })
                                                .catch(error => setSumOffPeak2(0));
                                        }
                                    })
                                    .catch(error => console.error(error));
                            })
                            .catch(error => console.error(error));
                    })
                    .catch(error => console.error(error));
            });
    }

    const handleSelectDate = () => {
        setIsHidden(!isHidden);
    };

    const handleSubmit = () => {
        fetchData()
        const parts = date.split(' ');
        const newDateStr = `${parts[1]}-${parts[0]}`;
        setBillingDate(newDateStr)
        setIsHidden(true);
    }

    const calNormel = () => {
        var v150f
        var v151_400
        var v401up
        if (sumMonth >= 150)
            v150f = 150 * billingType.energy1
        else
            v150f = sumMonth * billingType.energy1
        if (sumMonth >= 400)
            v151_400 = 250 * billingType.energy2
        else if (sumMonth < 151)
            v151_400 = 0
        else
            v151_400 = (sumMonth - 150) * billingType.energy2
        if (sumMonth > 400)
            v401up = (sumMonth - 400) * billingType.energy3
        else
            v401up = 0
        const total = v150f + v151_400 + v401up
        return total
    }

    const calNormel2 = () => {
        var v1 = calNormel()
        var vft = sumMonth * ft
        var vprn
        if (maxOnPeak2 > (maxOnPeak1 * 0.61974))
            vprn = (maxOnPeak2 - (maxOnPeak1 * 0.61974)) * billingType.kvarcharge
        else
            vprn = 0
        const total = v1 + vft + vprn + billingType.service
        return total
    }

    const calTOU = () => {
        var vmax = maxOnPeak1 * billingType.onpeakdemand
        var vsum = (sumOnPeak * billingType.energyonpeak) + (sumOffPeak1 * billingType.energyoffpeak) + (sumOffPeak2 * billingType.energyoffpeak)
        const total = vmax + vsum
        return total
    }

    const calTOU2 = () => {
        var v1 = calTOU()
        var vft = (sumOnPeak + sumOffPeak1 + sumOffPeak2) * ft
        var vprn
        if (maxOnPeak2 > (maxOnPeak1 * 0.61974))
            vprn = (maxOnPeak2 - (maxOnPeak1 * 0.61974)) * billingType.kvarcharge
        else
            vprn = 0
        const total = v1 + vft + vprn + billingType.service
        return total
    }

    useEffect(() => {
        async function fetchAll() {
            await fetchSite();
        }
        fetchAll();
    }, []);

    const MonthYearExample = () => {

        return (
            <View style={styles.dateContainer}>
                <DatePicker
                    style={styles.datePicker}
                    mode="monthYear"
                    selected={date}
                    current={date}
                    onMonthYearChange={selectedDate => {
                        setDate(selectedDate)
                        if (selectedDate !== date) {
                            setIsHidden(true)
                        }
                        const parts = selectedDate.split(' ');
                        const newDateStr = `${parts[1]}-${parts[0]}`;
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
                        <Fontisto name="date" size={20} color="white" style={{ marginRight: 5, marginLeft: 5 }}/>
                        <Text style={{ color: 'white', fontSize: 20 }}>Date{site !== null ? (
                                <Text style={styles.textData}> ({site.sitename})</Text>
                            ) : (
                                <ActivityIndicator />
                            )}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSelectDate}>
                        <Text style={styles.buttonText}>Select Month ({displayDate})</Text>
                    </TouchableOpacity>
                    {!isHidden && (
                        <MonthYearExample />
                    )}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    {billingType !== null && (billingType.peatype === "1112" || billingType.peatype === "1122"
                        || billingType.peatype === "2112" || billingType.peatype === "2122") && billingDate !== null
                        && (
                            <View>
                                <Text style={styles.buttonText}>Billing of ({billingDate})</Text>
                                <Text style={styles.buttonText}>PEA type is {billingType.peatype}</Text>
                                <Text style={styles.buttonText}>{billingType.description}</Text>
                                <TouchableOpacity style={styles.header}>
                                    <Text style={styles.rowText}>รายการ</Text>
                                    <Text style={styles.rowText}>พลังงานไฟฟ้า(kWh)</Text>
                                    <Text style={styles.rowText}>อัตราค่าพลังงานไฟฟ้า(Baht/kWh)</Text>
                                    <Text style={styles.rowText}>ค่าพลังงานไฟฟ้ารวม(Baht)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>หน่วยที่ 0 - 150</Text>
                                    {sumMonth >= 150 ? (
                                        <Text style={styles.rowText}>150</Text>
                                    ) : (
                                        <Text style={styles.rowText}>{(sumMonth).toFixed(3)}</Text>
                                    )}
                                    <Text style={styles.rowText}>{billingType.energy1}</Text>
                                    {sumMonth >= 150 ? (
                                        <Text style={styles.rowText}>{(150 * billingType.energy1).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>{(sumMonth * billingType.energy1).toFixed(2)}</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>หน่วยที่ 151 - 400</Text>
                                    {sumMonth >= 400 ? (
                                        <Text style={styles.rowText}>250</Text>
                                    ) : sumMonth >= 151 ? (
                                        <Text style={styles.rowText}>{(sumMonth).toFixed(3)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>{billingType.energy2}</Text>
                                    {sumMonth >= 400 ? (
                                        <Text style={styles.rowText}>{(250 * billingType.energy2).toFixed(2)}</Text>
                                    ) : sumMonth >= 151 ? (
                                        <Text style={styles.rowText}>{(sumMonth * billingType.energy2).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>หน่วยที่ 401 ขึ้นไป</Text>
                                    {sumMonth >= 401 ? (
                                        <Text style={styles.rowText}>{(sumMonth - 400).toFixed(3)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>{billingType.energy3}</Text>
                                    {sumMonth >= 401 ? (
                                        <Text style={styles.rowText}>{((sumMonth - 400) * billingType.energy3).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมทั้งหมด</Text>
                                    <Text style={styles.rowText}>{(sumMonth).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>-</Text>
                                    <Text style={styles.rowText}>{calNormel().toFixed(2)}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>...</Text>
                                <TouchableOpacity style={styles.header}>
                                    <Text style={styles.rowText}>ค่าพลังงานไฟฟ้ารวม</Text>
                                    <Text style={styles.rowText}>{calNormel().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>อัตราค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                                    <Text style={styles.rowText}>{ft}</Text>
                                    <Text style={styles.rowText}>บาท/กิโลวัตต์-ชั่วโมง</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                                    <Text style={styles.rowText}>{(sumMonth * ft).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่ารีแอดทีฟเพาเวอร์สูงสุด (kVar)</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak2).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าแอดทีฟเพาเวอร์สูงสุด (kW)</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak1).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>กิโลวัตต์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รีแอดทีฟเพาเวอร์ส่วนที่เกิน</Text>
                                    {maxOnPeak2 > (maxOnPeak1 * 0.61974) ? (
                                        <Text style={styles.rowText}>{(maxOnPeak2 - (maxOnPeak1 * 0.61974)).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>อัตรา (PRPn)</Text>
                                    <Text style={styles.rowText}>{billingType.kvarcharge}</Text>
                                    <Text style={styles.rowText}>บาท/กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าเพาเวอร์แฟตเตอร์ (RPn)</Text>
                                    {maxOnPeak2 > (maxOnPeak1 * 0.61974) ? (
                                        <Text style={styles.rowText}>{((maxOnPeak2 - (maxOnPeak1 * 0.61974)) * billingType.kvarcharge).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าบริการ (SvC)</Text>
                                    <Text style={styles.rowText}>{billingType.service}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมเงินค่าไฟฟ้า</Text>
                                    <Text style={styles.rowText}>{calNormel2().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ส่วนลด</Text>
                                    <Text style={styles.rowText}>0</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมเงินค่าไฟฟ้าหลังหักส่วนลด</Text>
                                    <Text style={styles.rowText}>{calNormel2().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าภาษีมูลค่าเพิ่ม 7% (VAT)</Text>
                                    <Text style={styles.rowText}>{(calNormel2() * 7 / 100).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tail}>
                                    <Text style={styles.rowText}>รวมเป็นเงินทั้งสิ้น</Text>
                                    <Text style={styles.rowText}>{(calNormel2() + (calNormel2() * 7 / 100)).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <Text></Text>
                            </View>
                        )}
                    {billingType !== null && (billingType.peatype !== "1112" && billingType.peatype !== "1122"
                        && billingType.peatype !== "2112" && billingType.peatype !== "2122") && billingDate !== null
                        && (
                            <View>
                                <Text style={styles.buttonText}>Billing of ({billingDate})</Text>
                                <Text style={styles.buttonText}>PEA type is {billingType.peatype}</Text>
                                <Text style={styles.buttonText}>{billingType.description}</Text>
                                <TouchableOpacity style={styles.header}>
                                    <Text style={styles.rowText}>รายการ kWDemand</Text>
                                    <Text style={styles.rowText}>ค่าความต้องการสูงสุด (kW)</Text>
                                    <Text style={styles.rowText}>อัตราค่าความต้องการ (Baht/kW/Month)</Text>
                                    <Text style={styles.rowText}>ค่าความต้องการ (Bath)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OnPeak (9.00-22.00) จ-ศ</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak1).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>{billingType.onpeakdemand}</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak1 * billingType.onpeakdemand).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OffPeak1 (22.00-9.00) จ-ศ</Text>
                                    <Text style={styles.rowText}>{(maxOffPeak1).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>0</Text>
                                    <Text style={styles.rowText}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OffPeak2 ตลอดวัน ส-อา วันหยุด</Text>
                                    <Text style={styles.rowText}>{(maxOffPeak2).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>0</Text>
                                    <Text style={styles.rowText}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมค่าความต้องการสูงสุด</Text>
                                    <Text style={styles.rowText}>-</Text>
                                    <Text style={styles.rowText}>-</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak1 * billingType.onpeakdemand).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>...</Text>
                                <TouchableOpacity style={styles.header}>
                                    <Text style={styles.rowText}>รายการ kWh</Text>
                                    <Text style={styles.rowText}>พลังงานไฟฟ้า (kWh)</Text>
                                    <Text style={styles.rowText}>อัตราค่าพลังงานไฟฟ้า (Baht/kWh)</Text>
                                    <Text style={styles.rowText}>ค่าพลังงานไฟฟ้ารวม (Baht)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OnPeak (9.00-22.00) จ-ศ</Text>
                                    <Text style={styles.rowText}>{(sumOnPeak).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>{billingType.energyonpeak}</Text>
                                    <Text style={styles.rowText}>{(sumOnPeak * billingType.energyonpeak).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OffPeak1 (22.00-9.00) จ-ศ</Text>
                                    <Text style={styles.rowText}>{(sumOffPeak1).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>{billingType.energyoffpeak}</Text>
                                    <Text style={styles.rowText}>{(sumOffPeak1 * billingType.energyoffpeak).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>OffPeak2 ตลอดวัน ส-อา วันหยุด</Text>
                                    <Text style={styles.rowText}>{(sumOffPeak2).toFixed(3)}</Text>
                                    <Text style={styles.rowText}>{billingType.energyoffpeak}</Text>
                                    <Text style={styles.rowText}>{(sumOffPeak2 * billingType.energyoffpeak).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมค่าพลังงานสูงสุด</Text>
                                    <Text style={styles.rowText}>-</Text>
                                    <Text style={styles.rowText}>-</Text>
                                    <Text style={styles.rowText}>{((sumOnPeak * billingType.energyonpeak) + (sumOffPeak1 * billingType.energyoffpeak) + (sumOffPeak2 * billingType.energyoffpeak)).toFixed(2)}</Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center' }}>...</Text>
                                <TouchableOpacity style={styles.header}>
                                    <Text style={styles.rowText}>ค่าพลังงานและความต้องการพลังงานไฟฟ้า</Text>
                                    <Text style={styles.rowText}>{calTOU().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>อัตราค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                                    <Text style={styles.rowText}>{ft}</Text>
                                    <Text style={styles.rowText}>บาท/กิโลวัตต์-ชั่วโมง</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าปรับปรุงต้นทุนการผลิต (FT)</Text>
                                    <Text style={styles.rowText}>{((sumOnPeak + sumOffPeak1 + sumOffPeak2) * ft).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่ารีแอดทีฟเพาเวอร์สูงสุด (kVar)</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak2).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าแอดทีฟเพาเวอร์สูงสุด (kW)</Text>
                                    <Text style={styles.rowText}>{(maxOnPeak1).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>กิโลวัตต์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รีแอดทีฟเพาเวอร์ส่วนที่เกิน</Text>
                                    {maxOnPeak2 > (maxOnPeak1 * 0.61974) ? (
                                        <Text style={styles.rowText}>{(maxOnPeak2 - (maxOnPeak1 * 0.61974)).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>อัตรา (PRPn)</Text>
                                    <Text style={styles.rowText}>{billingType.kvarcharge}</Text>
                                    <Text style={styles.rowText}>บาท/กิโลวาร์</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าเพาเวอร์แฟตเตอร์ (RPn)</Text>
                                    {maxOnPeak2 > (maxOnPeak1 * 0.61974) ? (
                                        <Text style={styles.rowText}>{((maxOnPeak2 - (maxOnPeak1 * 0.61974)) * billingType.kvarcharge).toFixed(2)}</Text>
                                    ) : (
                                        <Text style={styles.rowText}>0</Text>
                                    )}
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าบริการ (SvC)</Text>
                                    <Text style={styles.rowText}>{billingType.service}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมเงินค่าไฟฟ้า</Text>
                                    <Text style={styles.rowText}>{calTOU2().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ส่วนลด</Text>
                                    <Text style={styles.rowText}>0</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>รวมเงินค่าไฟฟ้าหลังหักส่วนลด</Text>
                                    <Text style={styles.rowText}>{calTOU2().toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row}>
                                    <Text style={styles.rowText}>ค่าภาษีมูลค่าเพิ่ม 7% (VAT)</Text>
                                    <Text style={styles.rowText}>{(calTOU2() * 7 / 100).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tail}>
                                    <Text style={styles.rowText}>รวมเป็นเงินทั้งสิ้น</Text>
                                    <Text style={styles.rowText}>{(calTOU2() + (calTOU2() * 7 / 100)).toFixed(2)}</Text>
                                    <Text style={styles.rowText}>บาท</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
    dateContainer: {
        flex: 1,
        width: '98%',
        height: 330,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "#E5E5E5",
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'black'
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
    picker: {
        width: 200,
        height: 50,
        backgroundColor: '#E5E5E5',
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
        borderColor: 'black',
    },
    row: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    tail: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    rowText: {
        fontSize: 16,
        color: 'black',
        width: '24%',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        width: '100%',
        textAlign: 'center',
    },
    datePicker: {
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#E5E5E5'
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
});