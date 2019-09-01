import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class CrearOrden extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            vehiculos: [],
            idVehiculoCliente: '',
            labelVehiculoCliente: '',

            anio: '',
            marca: '',
            linea: '',
            tipo: '',
            combustible: '',
            tamanio: '',
        };

    }

    pickerChangeVehiculos(index) {
        this.state.vehiculos.map((v, i) => {
            if (index === i) {
                this.setState({
                    idVehiculoCliente: this.state.vehiculos[index].idVehiculoCliente,
                    labelVehiculoCliente: this.state.vehiculos[index].nombre,

                    anio: this.state.vehiculos[index].anio,
                    marca: this.state.vehiculos[index].marca,
                    linea: this.state.vehiculos[index].linea,
                    tipo: this.state.vehiculos[index].tipo,
                    combustible: this.state.vehiculos[index].combustible,
                    tamanio: this.state.vehiculos[index].tamanio,
                })
            }
        })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    siguiente = () => {

        const valido = this.validate({
            idVehiculoCliente: { required: true },
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            this.props.navigation.navigate('CrearOrden2', {
                idUsuario: this.state.idUsuario,
                idServicio: '1',
                idVehiculoCliente: this.state.idVehiculoCliente,
            });
        }
    };

    componentDidMount() {

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
                        <Text style={styles.titulo3}>Características del vehículo 1/5</Text>
                        <Text style={styles.subtitulo}>Vehículo</Text>
                        <Picker
                            selectedValue={this.state.idVehiculoCliente}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeVehiculos(itemIndex)}>{
                                this.state.vehiculos.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idVehiculoCliente} />
                                })
                            }
                        </Picker>
                        <Text style={styles.titulo4}>{this.state.marca + ' ' + this.state.linea}</Text>
                        <Text style={styles.subtitulo}>{'Año ' + this.state.anio}</Text>
                        <Text style={styles.subtitulo}>{this.state.tipo + ' | ' + this.state.combustible}</Text>
                        <Text style={styles.subtitulo}>{'Motor ' + this.state.tamanio}</Text>
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
    titulo4: {
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
