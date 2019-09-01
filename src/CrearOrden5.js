import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';
var dateFormat = require('dateformat');

export default class CrearOrden5 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

        };

    }

    handleClose = () => {
        this.setState({ show: false });

        if (this.state.estilo === 'success') {
            this.props.navigation.navigate('Inicio');
        }
    }

    aceptar = () => {

        const { params } = this.props.navigation.state;

        var url = '/Orden/InsertarOrden';
        axios.post(url, {
            idUsuario: params.idUsuario,
            idServicio: params.idServicio,
            idVehiculoCliente: params.idVehiculoCliente,
            fechaHoraInicio: params.fechaHoraInicio,
            direccion: params.direccion,
            latitud: params.latitud,
            longitud: params.longitud,
            idMarcaAceite: params.idMarcaAceite,
            idTipoAceite: params.idTipoAceite,
            idTipoViscosidad: params.idTipoViscosidad,
            idMarcaFiltroAceite: params.idMarcaFiltroAceite,
            total: params.total,
        })
            .then(response => {
                this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    };

    componentDidMount() {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;

        this.setState({ idUsuario: idUsuario });

    }

    render() {

        const { params } = this.props.navigation.state;
        const total = params.total;

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
                        <Text style={styles.titulo3}>Confirmación de la orden 5/5</Text>

                        <View style={styles.card}>
                            <Text style={styles.titulo4}>Precio total</Text>
                            <Text style={styles.precio}>Q {total}</Text>
                            <Text style={styles.info}>(Esto dependera de la marca y tamaño del motor del vehículo, marca de aceite, tipo y viscosidad de aceite)</Text>
                        </View>

                        <Text style={styles.titulo2}>El pago se hara en efectivo, al terminar el servicio.</Text>

                        <TouchableOpacity style={styles.boton} onPress={this.aceptar.bind(this)}>
                            <Text style={styles.texto}>Aceptar</Text>
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
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#78909C',
        padding: 15,
        marginTop: 3,
        marginBottom: 20
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
