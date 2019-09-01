import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends Component {

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='rgb(207, 70, 17)' barStyle="ligth-content" />
                <LinearGradient colors={['rgb(255,101,42)', 'rgb(255,101,42)', 'rgb(255,57,52)', 'rgb(176,33,23)']} style={styles.LinearGradientStyle} >
                    <ImageBackground source={require('../img/background/fondo2.png')} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.logo}>
                                <Image source={require('../img/logo-Mantto-color.png')} style={{ width: 140, height: 104 }} />
                            </View>
                            <View style={styles.panel}>
                                <Text style={styles.titulo}>Bienvenido a Mantto</Text>
                                <Text style={styles.subtitulo}>Servicio menor de tu vehículo en la palma de tu mano</Text>

                                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Slide')}>
                                    <Text style={styles.texto}>Comenzar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </LinearGradient>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(176,33,23)'
    },
    logo: {
        flex: 2,
        padding: 60,
        alignItems: 'center',
        justifiContent: 'center'
    },
    panel: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifiContent: 'center'
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        marginVertical: 30,
    },
    boton: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    texto: {
        fontSize: 24,
        textAlign: 'center',
        color: '#B02117'
    },
    LinearGradientStyle: {
        flex: 1
    }
});
