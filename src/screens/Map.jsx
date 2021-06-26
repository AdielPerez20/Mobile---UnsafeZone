import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function App() {
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });

    const {
        params: { alarms },
    } = useRoute();

    const mapRef = useRef();

    useEffect(() => {
        setRegion({
            ...region,
            latitude: alarms[0].coordinates[0],
            longitude: alarms[0].coordinates[1],
        });
    }, []);

    console.log({ alarms });

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                {alarms.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.coordinates[0],
                            longitude: marker.coordinates[1],
                        }}
                    >
                        <Image
                            source={
                                marker.safe
                                    ? require('../assets/pin-green.png')
                                    : require('../assets/pin-red.png')
                            }
                            width={40}
                            height={40}
                            style={{ width: 40, height: 40 }}
                        />
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
