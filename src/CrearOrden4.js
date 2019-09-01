import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class CrearOrden4 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            total: ''
        };

    }

    handleClose = () => {
        this.setState({ show: false })
    }

    siguiente = () => {

        const valido = this.validate({
            total: { required: true },
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            this.props.navigation.navigate('CrearOrden5', {
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
                total: this.state.total,
            });
        }
    };

    componentDidMount() {

        const { params } = this.props.navigation.state;

        var url = '/Orden/ObtenerTotalOrden';
        axios.post(url, {
            idUsuario: params.idUsuario,
            idServicio: params.idServicio,
            idVehiculoCliente: params.idVehiculoCliente,
            idMarcaAceite: params.idMarcaAceite,
            idTipoAceite: params.idTipoAceite,
            idTipoViscosidad: params.idTipoViscosidad,
            idMarcaFiltroAceite: params.idMarcaFiltroAceite,
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    this.setState({
                        total: response.data[0].total
                    })
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
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
                        <Text style={styles.titulo3}>Total de la orden 4/5</Text>

                        <View style={styles.card}>
                            <Text style={styles.titulo4}>Precio total</Text>
                            <Text style={styles.precio}>Q {this.state.total}</Text>
                            <Text style={styles.info}>(Esto dependera de la marca y tamaño del motor del vehículo, marca de aceite, tipo y viscosidad de aceite)</Text>
                        </View>

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
