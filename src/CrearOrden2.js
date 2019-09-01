import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import openMap from 'react-native-open-maps';
var dateFormat = require('dateformat');

export default class CrearOrden2 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            direccion: '',
            latitud: '',
            longitud: ''
        };

    }

    handleClose = () => {
        this.setState({ show: false })
    }

    siguiente = () => {

        const valido = this.validate({
            direccion: { required: true },
            latitud: { required: true },
            longitud: { required: true },
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            this.props.navigation.navigate('CrearOrden3', {
                idUsuario: params.idUsuario,
                idServicio: params.idServicio,
                idVehiculoCliente: params.idVehiculoCliente,
                fechaHoraInicio: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
                direccion: this.state.direccion,
                latitud: this.state.latitud,
                longitud: this.state.longitud,
            });
        }
    };

    findCoordinates = () => {

        navigator.geolocation.getCurrentPosition((position) => {

            this.setState({
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
            });

        },
            (error) => this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: 'Asegurate de tener activado el GPS y darle permisos a Mantto para acceder a tu ubicación.' }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );

    }

    componentWillMount() {

        this.props.navigation.addListener('didFocus', () => {
            this.findCoordinates();
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='rgb(207, 70, 17)' barStyle="ligth-content" />
                <View style={{ flex: 1 }}>
                    <SCLAlert
                        onRequestClose={() => this.setState({ show: false })}
                        theme={this.state.estilo}
                        show={this.state.show}
                        title={this.state.titulo}
                        subtitle={this.state.subtitulo}>
                        <SCLAlertButton theme={this.state.estilo} onPress={this.handleClose.bind(this)}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                    <View style={styles.panel}>
                        <Text style={styles.titulo}>Crear orden</Text>
                        <Text style={styles.titulo2}>Servicio completo</Text>
                        <Text style={styles.titulo3}>Ubicación del vehículo 2/5</Text>
                        <Fumi
                            style={styles.input}
                            label={'Dirección'}
                            iconClass={FontAwesomeIcon}
                            iconName={'map-marker'}
                            iconColor={'rgb(255,101,42)'}
                            onChangeText={(direccion) => this.setState({ direccion })}
                            value={this.state.direccion}
                            autoCorrect={false} />
                        <Image source={require('../img/icon-site.png')} style={{ width: 30, height: 30, margin: 20 }} />
                        <Text style={styles.subtitulo}>{'Latitud: ' + this.state.latitud}</Text>
                        <Text style={styles.subtitulo}>{'Longitud: ' + this.state.longitud}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.findCoordinates.bind(this)}>
                            <Text style={styles.link}>Actualizar ubicación</Text>
                        </TouchableOpacity>
                        <Text style={styles.subtitulo}>Verificar ubicación en Google Maps</Text>
                        <TouchableOpacity style={styles.button} onPress={() => openMap({ latitude: this.state.latitud, longitude: this.state.longitud, provider: 'google', zoom: 30 })}>
                            <Text style={styles.link}>Abrir Google Maps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boton} onPress={this.siguiente.bind(this)}>
                            <Text style={styles.texto}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        marginTop: 10,
        color: '#B02117'
    },
    titulo2: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000'
    },
    titulo3: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        color: 'gray'
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5
    },
    input: {
        width: '100%',
        height: 40
    },
    combo: {
        width: '90%',
        height: 40,
        marginVertical: 10,
        padding: 10
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        padding: 10
    },
    boton: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: 'rgb(255,101,42)'
    },
    texto: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff'
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    }
});
