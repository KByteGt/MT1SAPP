import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Slideshow from 'react-native-slideshow';

export default class Slide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            interval: null,
            dataSource: [
                {
                    url: require('../img/slider/img1.png'),
                }, {
                    url: require('../img/slider/img2.png'),
                }, {
                    url: require('../img/slider/img3.png'),
                }, {
                    url: require('../img/slider/img4.png'),
                }, {
                    url: require('../img/slider/img5.png'),
                }, {
                    url: require('../img/slider/img6.png'),
                }, {
                    url: require('../img/slider/img7.png'),
                },
            ],
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='rgb(207, 70, 17)' barStyle="ligth-content" />
                <LinearGradient colors={['rgb(255,101,42)', 'rgb(255,101,42)', 'rgb(255,57,52)', 'rgb(176,33,23)']} style={styles.LinearGradientStyle} >
                    <ImageBackground source={require('../img/background/fondo2.png')} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.logo}>
                                <Image source={require('../img/logo-Mantto.png')} style={{ width: 50, height: 50 }} />
                            </View>
                            <Text style={styles.titulo}>El servicio incluye</Text>
                            <View style={styles.slider}>
                                <Slideshow
                                    dataSource={this.state.dataSource}
                                    position={this.state.position}
                                    height={300}
                                    scrollEnabled={false}
                                    arrowSize={0}
                                    indicatorSize={0}
                                    onPositionChanged={position => this.setState({ position })}
                                />
                            </View>
                            <View style={styles.panel}>
                                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Registro')}>
                                    <Text style={styles.texto}>Registrate</Text>
                                </TouchableOpacity>
                                <Text style={styles.subtitulo}>¿Ya tienes una cuenta?</Text>
                                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                                    <Text style={styles.link}>Iniciar sesión</Text>
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
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifiContent: 'center'
    },
    slider: {
        flex: 1,
        marginBottom: 30
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
        color: '#B02117'
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
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
        fontSize: 20,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    },
    LinearGradientStyle: {
        flex: 1
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        padding: 10
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    }
});
