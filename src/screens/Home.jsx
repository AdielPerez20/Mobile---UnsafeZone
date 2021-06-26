import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [alarms, setAlarms] = useState(
        [{coordinates:[32.08607218172059, 34.772899431792375],safe: false},
        {coordinates:[32.09042441465643, 34.77759246062839],safe: false},
        {coordinates:[32.08975178290961, 34.77613333891271],safe: false},
        {coordinates:[32.088288715155215, 34.77669405094084],safe: true},
        {coordinates:[32.08963640312281, 34.779093154332806],safe: false},
        {coordinates:[32.09102825671594, 34.77369517170088],safe: true},
        {coordinates:[32.08653889661166, 34.77317450936436],safe: false},
        {coordinates:[32.086714660933715, 34.78533129783208],safe: true},
        {coordinates:[32.081903873149415, 34.7760942806506],safe: false},
        {coordinates:[32.09414197211471, 34.7779382959095],safe: true},
        {coordinates:[32.08431237211298, 34.77221439236493],safe: false},
        {coordinates:[32.081647844371, 34.77445062248363],safe: true},
        {coordinates:[32.08009289413501, 34.769901708456],safe: true},
        {coordinates:[32.07900110475855, 34.77158070676662],safe: true},
        {coordinates:[32.07929601579667, 34.77066182862906],safe: false},
        {coordinates:[32.081455218748594, 34.76879474131784],safe: true},
        {coordinates:[32.08369988061327, 34.77025813407528],safe: false},
        {coordinates:[32.07821539673614, 34.77676703692593],safe: false},
        {coordinates:[32.082028527749685, 34.78137364187428],safe: true},
        {coordinates:[32.0826590301503, 34.77531418459606],safe: false},
        {coordinates:[32.077524812690164, 34.769892564926074],safe: true},
        {coordinates:[32.07743473612564, 34.77265652789509],safe: false},
        {coordinates:[32.07558654441136, 34.768330030998875],safe: true},
        {coordinates:[32.0764836013515, 34.77956187957759],safe: false},
        {coordinates:[32.07661964955374, 34.77668691208695],safe: true},
        {coordinates:[32.07075404261172, 34.77444361761085],safe: true},
        {coordinates:[32.06499669212633, 34.767906016566215],safe: false},
        {coordinates:[32.069993658605355, 34.76438083953234],safe: true},
        {coordinates:[32.071351482752384, 34.76585500447378],safe: false},
        {coordinates:[32.06342150479248, 34.77764832400528],safe: true},
        {coordinates:[32.0651053247356, 34.78232719534114],safe: false},
        {coordinates:[32.06553985388243, 34.76700869877577],safe: false},
        {coordinates:[32.06196519812021, 34.780458498754186],safe: false},
        {coordinates:[32.06079438401015, 34.76472447144447],safe: true},
        {coordinates:[32.068086673609194, 34.78926744093628],safe: true},
        {coordinates:[32.069479398180604, 34.775992978766155],safe: false},
        {coordinates:[32.06272984297456, 34.78180845743117],safe: false},
        {coordinates:[32.06658679265779, 34.76335063384224],safe: true},
        {coordinates:[32.067658138704594, 34.76979822975344],safe: false},
        {coordinates:[32.05276714661763, 34.77165533977012],safe: true},
        {coordinates:[32.05450776464272, 34.760017697955284],safe: false},
        {coordinates:[32.053579439149864, 34.77001237857273],safe: false},
        {coordinates:[32.05566815826398, 34.77822718455967],safe: true},
        {coordinates:[32.06785140271175, 34.76439892781499],safe: false},
        {coordinates:[32.0610057793664, 34.77370904126685],safe: true},
        {coordinates:[32.068083448761705, 34.78972791294138],safe: false}
    ]);
          
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigation = useNavigation();

    useEffect(() => { // function to fetch alarms/alerts from API.
        (async () => {
            try {
                const { data } = await axios.get(
                    'https://www.oref.org.il/WarningMessages/History/AlertsHistory.json'
                );
                setAlarms(data);
            } catch (error) {}
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: 6,
            });
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = JSON.stringify(errorMsg);
    } else if (location) {
        text = JSON.stringify(location, null, 2);
    }

    const onPressIcon = async () => {
        let currentLocation = await Location.getCurrentPositionAsync({
            accuracy: 6,
        });
        Alert.alert('Alert', 'Did you get to safe zone?', [
            {
                text: 'No',
                onPress: () =>
                    setAlarms([
                        ...alarms,
                        {
                            coordinates: [
                                currentLocation.coords.latitude,
                                currentLocation.coords.longitude,
                            ],
                            safe: false,
                        },
                    ]),
            },
            {
                text: 'Yes',
                onPress: () =>
                    setAlarms([
                        ...alarms,
                        {
                            coordinates: [
                                currentLocation.coords.latitude,
                                currentLocation.coords.longitude,
                            ],
                            safe: true,
                        },
                    ]),
            },
        ]);
    };

    const onPressSafe = () => {
        navigation.navigate('Map', { alarms });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {location?.coords && (
                    <Pressable
                        onPress={onPressIcon}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../assets/icon.png')}
                            width={64}
                            height={64}
                            style={{ width: 64, height: 64 }}
                        />
                        {alarms.length ? (
                            <Text>No. of alerts: {alarms.length}</Text>
                        ) : (
                            <Text>No alerts in the past day</Text>
                        )}
                    </Pressable>
                )}
            </View>
            <Pressable style={styles.safeBtn} onPress={onPressSafe}>
                <Text style={styles.safeBtnText}>Show Map</Text>
            </Pressable>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: {
        paddingHorizontal: 12,
        marginTop: 12,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeBtn: {
        paddingVertical: 12,
        backgroundColor: '#fa2d2d',
        borderRadius: 8,
        margin: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeBtnText: {
        textAlign: 'center',
        color: '#fefefe',
        fontSize: 16,
        marginLeft: 8,
    },
});
