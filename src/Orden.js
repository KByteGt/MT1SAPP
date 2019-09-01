import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import { createOpenLink } from 'react-native-open-maps';
import axios from 'axios';
var dateFormat = require('dateformat');

export default class Orden extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            ordenes: [],

            latitud: '',
            longitud: ''
        };

    }

    handleClose = () => {
        this.setState({ show: false });

        if (this.state.estilo === 'success') {
            this.props.navigation.navigate('Inicio');
        }
    }

    cargar = () => {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;

        this.setState({ idUsuario: idUsuario });

        var url = '/Orden/ObtenerOrdenes';
        axios.get(url)
            .then(response => {
                this.setState({
                    ordenes: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    atender = (idOrden) => {

        var url = '/Orden/AtenderOrden';
        axios.post(url, {
            idUsuario: this.state.idUsuario,
            idOrden: idOrden,
        })
            .then(response => {
                this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

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
            this.cargar();
            this.findCoordinates();
        });
    }

    render() {

        const ordenes = this.state.ordenes.map((orden, i) => {
            return (
                <View style={styles.card}>
                    <Text style={styles.titulo2}>{orden.servicio}</Text>
                    <Text style={styles.titulo3}>{orden.marcaVehiculo + ' ' + orden.linea}</Text>
                    <Text style={styles.subtitulo}>Año {orden.anio}</Text>
                    <Text style={styles.subtitulo}>{orden.tipoVehiculo} | {orden.combustible}</Text>
                    <Text style={styles.subtitulo}>Motor {orden.tamanio}</Text>
                    <Text style={styles.titulo3}>-</Text>
                    <Text style={styles.subtitulo}>Aceite {orden.marcaAceite}</Text>
                    <Text style={styles.subtitulo}>{orden.tipoAceite} | {orden.viscosidad}</Text>
                    <Text style={styles.subtitulo}>Cantidad de aceite {orden.cantidad_aceite} lts</Text>
                    <Text style={styles.subtitulo}>Filtro {orden.filtro}</Text>
                    <Text style={styles.titulo3}>-</Text>
                    <Text style={styles.subtitulo}>{dateFormat(orden.fechaHoraInicio, "yyyy-mm-dd HH:MM:ss")}</Text>
                    <Text style={styles.subtitulo}>{orden.direccion}</Text>
                    <TouchableOpacity style={styles.button} onPress={createOpenLink({ travelType: 'drive', start: this.state.latitud + ',' + this.state.longitud, end: orden.latitud + ',' + orden.longitud, provider: 'google' })}>
                        <Text style={styles.link}>Abrir Google Maps</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.atender.bind(this, orden.idOrden)}>
                        <Text style={styles.link}>Atender</Text>
                    </TouchableOpacity>
                </View>
            )
        })

        return (
            <ScrollView style={styles.container} >
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
                        <Text style={styles.titulo}>Ordenes recientes</Text>
                        <View style={styles.cardcontainer}>
                            {ordenes}
                        </View>
                        <TouchableOpacity style={styles.boton} onPress={this.cargar.bind(this)}>
                            <Text style={styles.texto}>Actualizar</Text>
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
    cardcontainer: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        marginVertical: 10
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#78909C',
        padding: 15,
        marginVertical: 3
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: '#B02117'
    },
    titulo2: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'rgb(255,101,42)'
    },
    titulo3: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    },
    titulo4: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    precio: {
        fontSize: 29,
        fontWeight: 'bold',
    },
    info: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: '#B0BEC5'
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
