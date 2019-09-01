import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class Vehiculo extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            vehiculos: [],
        };

    }

    handleClose = () => {
        this.setState({ show: false });

        this.cargar();
    }

    cargar = () => {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;

        this.setState({ idUsuario: idUsuario });

        var url = '/Vehiculo/ObtenerVehiculoCliente';
        axios.post(url, {
            idUsuario: idUsuario
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    this.setState({
                        vehiculos: response.data
                    });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    eliminar = (idVehiculoCliente) => {

        var url = '/Vehiculo/EliminarVehiculoCliente';
        axios.post(url, {
            idVehiculoCliente: idVehiculoCliente,
        })
            .then(response => {
                this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    };

    componentWillMount() {

        this.props.navigation.addListener('didFocus', () => {
            this.cargar();
        });
    }

    render() {

        const vehiculos = this.state.vehiculos.map((vehiculo, i) => {
            return (
                <View style={styles.card}>
                    <Text style={styles.titulo2}>{vehiculo.nombre}</Text>
                    <Text style={styles.titulo3}>{vehiculo.marca + ' ' + vehiculo.linea}</Text>
                    <Text style={styles.subtitulo}>Año {vehiculo.anio}</Text>
                    <Text style={styles.subtitulo}>{vehiculo.tipo} | {vehiculo.combustible}</Text>
                    <Text style={styles.subtitulo}>Motor {vehiculo.tamanio}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.eliminar.bind(this, vehiculo.idVehiculoCliente)}>
                        <Text style={styles.link}>Eliminar</Text>
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
                        <Text style={styles.titulo}>Vehículos creados</Text>
                        <View style={styles.cardcontainer}>
                            {vehiculos}
                        </View>
                        <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('CrearVehiculo', { idUsuario: this.state.idUsuario })}>
                            <Text style={styles.texto}>Agregar</Text>
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
