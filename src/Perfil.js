import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class Perfil extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            email: '',
            tipo: '',
            idPersona: '',
            nombre: '',
            apellido: '',
            telefono: '',
            dpi: '',
            direccion: '',
            nit: '',
            idPais: ''
        };

    }

    handleClose = () => {
        this.setState({ show: false });

        this.cargar();
    }

    cargar() {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;

        this.setState({ idUsuario: idUsuario });

        var url = '/Usuario/ObtenerPerfil';
        axios.post(url, {
            idUsuario: idUsuario
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    this.setState({
                        email: response.data[0].email,
                        tipo: response.data[0].tipo,
                        idPersona: response.data[0].idPersona,
                        nombre: response.data[0].nombre,
                        apellido: response.data[0].apellido,
                        telefono: response.data[0].telefono,
                        dpi: response.data[0].dpi,
                        direccion: response.data[0].direccion,
                        nit: response.data[0].nit,
                        idPais: response.data[0].idPais
                    });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    }

    actualizar = () => {

        const valido = this.validate({
            nombre: { required: true },
            apellido: { required: true },
            telefono: { minlength: 8, maxlength: 8, numbers: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            var url = '/Usuario/ActualizarPerfil';
            axios.post(url, {
                idUsuario: this.state.idUsuario,
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                telefono: this.state.telefono,
                dpi: '',
                direccion: '',
                nit: '',
                idPais: '1'
            })
                .then(response => {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                })
                .catch(error => {
                    this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
                });
        }
    };

    componentWillMount() {

        this.props.navigation.addListener('didFocus', () => {
            this.cargar();
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
                        <Text style={styles.titulo}>Editar información</Text>
                        <Fumi
                            style={styles.input}
                            label={'Nombre'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'rgb(255,101,42)'}
                            onChangeText={(nombre) => this.setState({ nombre })}
                            value={this.state.nombre}
                            autoCorrect={false} />
                        <Fumi
                            style={styles.input}
                            label={'Apellido'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'rgb(255,101,42)'}
                            onChangeText={(apellido) => this.setState({ apellido })}
                            value={this.state.apellido}
                            autoCorrect={false} />
                        <Fumi
                            style={styles.input}
                            label={'Teléfono'}
                            iconClass={FontAwesomeIcon}
                            iconName={'phone'}
                            iconColor={'rgb(255,101,42)'}
                            onChangeText={(telefono) => this.setState({ telefono })}
                            value={this.state.telefono}
                            keyboardType="numeric" autoCorrect={false} />
                        <TouchableOpacity style={styles.boton} onPress={this.actualizar.bind(this)}>
                            <Text style={styles.texto}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CambiarPassword', { idUsuario: this.state.idUsuario })}>
                            <Text style={styles.link}>Cambiar contraseña</Text>
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
        margin: 10,
        color: '#B02117'
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
