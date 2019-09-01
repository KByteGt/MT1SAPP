import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import md5 from 'md5';

export default class RegistroMecanico extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            email: '',
            password: '',
            nombre: '',
            apellido: '',
            telefono: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    siguiente = () => {

        const valido = this.validate({
            email: { required: true, email: true },
            password: { required: true, password: true },
            nombre: { required: true },
            apellido: { required: true },
            telefono: { minlength: 8, maxlength: 8, numbers: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            this.props.navigation.navigate('RegistroMecanico2', {
                email: this.state.email,
                password: md5(this.state.password),
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                telefono: this.state.telefono
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
                            <Text style={styles.titulo}>Registro</Text>
                            <Text style={styles.titulo2}>Técnico Mecánico</Text>
                            <Text style={styles.titulo3}>Datos básicos 1/4</Text>
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
                            <TouchableOpacity style={styles.boton} onPress={this.siguiente.bind(this)}>
                                <Text style={styles.texto}>Siguiente</Text>
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
