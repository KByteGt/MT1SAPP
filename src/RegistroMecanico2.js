import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

export default class RegistroMecanico2 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            dpi: '',
            direccion: '',
            nit: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    siguiente = () => {

        const valido = this.validate({
            dpi: { minlength: 13, maxlength: 13, numbers: true },
            direccion: { required: true },
            nit: { required: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            this.props.navigation.navigate('RegistroMecanico3', {
                email: params.email,
                password: params.password,
                nombre: params.nombre,
                apellido: params.apellido,
                telefono: params.telefono,
                dpi: this.state.dpi,
                direccion: this.state.direccion,
                nit: this.state.nit,
                idPais: '1'
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
                            <Text style={styles.titulo3}>Datos personales 2/4</Text>
                            <Fumi
                                style={styles.input}
                                label={'DPI'}
                                iconClass={FontAwesomeIcon}
                                iconName={'address-card'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(dpi) => this.setState({ dpi })}
                                value={this.state.dpi}
                                keyboardType="numeric" autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'Dirección'}
                                iconClass={FontAwesomeIcon}
                                iconName={'map-marker'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(direccion) => this.setState({ direccion })}
                                value={this.state.direccion}
                                autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'NIT'}
                                iconClass={FontAwesomeIcon}
                                iconName={'id-card'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(nit) => this.setState({ nit })}
                                value={this.state.nit}
                                autoCorrect={false} />
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
    combo: {
        width: '80%',
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
