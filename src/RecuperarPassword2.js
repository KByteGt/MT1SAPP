import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import md5 from 'md5';
import axios from 'axios';

export default class RecuperarPassword2 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            resetCode: '',
            password_nueva: '',
            password_confirmacion: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false });

        if (this.state.estilo === 'success') {
            this.props.navigation.navigate('Login');
        }
    }

    restablecer = () => {

        const valido = this.validate({
            resetCode: { minlength: 5, maxlength: 5 },
            password_nueva: { required: true, password: true },
            password_confirmacion: { required: true, password: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else if (this.state.password_nueva != this.state.password_confirmacion) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: 'La contraseña de verificación no coincide.' });
        } else {
            const { params } = this.props.navigation.state;

            var url = '/Login/RecuperarPassword2';
            axios.post(url, {
                email: params.email,
                resetCode: this.state.resetCode,
                password: md5(this.state.password_nueva)
            })
                .then(response => {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
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
                            <Text style={styles.titulo}>Restablecimiento de contraseña</Text>
                            <Text style={styles.titulo3}>Cambio de contraseña 2/2</Text>
                            <Fumi
                                style={styles.input}
                                label={'Código'}
                                iconClass={FontAwesomeIcon}
                                iconName={'unlock'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(resetCode) => this.setState({ resetCode })}
                                value={this.state.resetCode}
                                keyboardType="numeric" autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'Contraseña nueva'}
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(password_nueva) => this.setState({ password_nueva })}
                                value={this.state.password_nueva}
                                secureTextEntry />
                            <Fumi
                                style={styles.input}
                                label={'Confirmar contraseña'}
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(password_confirmacion) => this.setState({ password_confirmacion })}
                                value={this.state.password_confirmacion}
                                secureTextEntry />
                            <TouchableOpacity style={styles.boton} onPress={this.restablecer.bind(this)}>
                                <Text style={styles.texto}>Aceptar</Text>
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
