import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import md5 from 'md5';
import axios from 'axios';

export default class Login extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            email: '',
            password: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    logear = () => {

        const valido = this.validate({
            email: { required: true, email: true },
            password: { required: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            var url = '/Login/AutenticarUsuario';
            axios.post(url, {
                email: this.state.email,
                password: md5(this.state.password)
            })
                .then(response => {
                    if (response.data.mensaje === undefined) {

                        const idUsuario = response.data[0].idUsuario;
                        const tipo = response.data[0].tipo;

                        this.props.navigation.navigate('Inicio', {
                            idUsuario: idUsuario,
                            tipo: tipo,
                        });

                        this.props.navigation.navigate('DrawerNav', {
                            idUsuario: idUsuario,
                            tipo: tipo,
                        });

                    } else {
                        this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                    }
                })
                .catch(error => {
                    this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
                });
        }
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='rgb(207, 70, 17)' barStyle="ligth-content" />
                <ImageBackground source={require('../img/background/fondo1.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <SCLAlert
                            onRequestClose={() => this.setState({ show: false })}
                            theme={this.state.estilo}
                            show={this.state.show}
                            title={this.state.titulo}
                            subtitle={this.state.subtitulo}>
                            <SCLAlertButton theme={this.state.estilo} onPress={this.handleClose.bind(this)}>Aceptar</SCLAlertButton>
                        </SCLAlert>
                        <View style={styles.logo}>
                            <Image source={require('../img/logo-Mantto.png')} style={{ width: 50, height: 50 }} />
                        </View>
                        <View style={styles.panel}>
                            <Text style={styles.titulo}>Iniciar sesión</Text>
                            <Fumi
                                style={styles.input}
                                label={'Correo electrónico'}
                                iconClass={FontAwesomeIcon}
                                iconName={'envelope'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'Contraseña'}
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                secureTextEntry />
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('RecuperarPassword')}>
                                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={this.logear.bind(this)}>
                                <Text style={styles.texto}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        padding: 20,
        alignItems: 'center',
        justifiContent: 'center',
        height: 70
    },
    panel: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifiContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10
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
