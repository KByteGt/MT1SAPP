import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
var dateFormat = require('dateformat');

export default class RegistroMecanico4 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            nombre: '',
            numero: '',
            fechaVencimiento: dateFormat(new Date(), "yyyy-mm-dd"),
            cvv: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false });

        if (this.state.estilo === 'success') {
            this.props.navigation.navigate('Login');
        }
    }

    registrar = () => {

        const valido = this.validate({
            nombre: { required: true },
            numero: { minlength: 16, maxlength: 16, numbers: true },
            fechaVencimiento: { required: true, date: 'YYYY-MM-DD' },
            cvv: { minlength: 3, maxlength: 3, numbers: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            var url = '/Mecanico/InsertarMecanico';
            axios.post(url, {
                email: params.email,
                password: params.password,
                nombre: params.nombre,
                apellido: params.apellido,
                telefono: params.telefono,
                dpi: params.dpi,
                direccion: params.direccion,
                nit: params.nit,
                idPais: params.idPais,
                placa: params.placa,
                anio: params.anio,
                idMarcaMoto: params.idMarcaMoto,
                idLineaMoto: params.idLineaMoto,
                nombreTarjeta: this.state.nombre,
                numero: this.state.numero,
                fechaVencimiento: this.state.fechaVencimiento,
                cvv: this.state.cvv
            })
                .then(response => {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                })
                .catch(error => {
                    Alert.alert('Error', error);
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
                            <Text style={styles.titulo3}>Datos de la tarjeta 4/4</Text>
                            <Fumi
                                style={styles.input}
                                label={'Nombre de tarjeta'}
                                iconClass={FontAwesomeIcon}
                                iconName={'credit-card'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(nombre) => this.setState({ nombre })}
                                value={this.state.nombre}
                                autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'Número de tarjeta'}
                                iconClass={FontAwesomeIcon}
                                iconName={'credit-card'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(numero) => this.setState({ numero })}
                                value={this.state.numero}
                                keyboardType="numeric" autoCorrect={false} />
                            <Text style={styles.subtitulo}>Fecha de vencimiento</Text>
                            <DatePicker
                                style={styles.datepicker}
                                date={this.state.fechaVencimiento}
                                mode="date"
                                placeholder=""
                                format="YYYY-MM-DD"
                                minDate="2010-01-01"
                                maxDate="2030-01-01"
                                confirmBtnText="Aceptar"
                                cancelBtnText="Cancelar"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ fechaVencimiento: date }) }}
                            />
                            <Fumi
                                style={styles.input}
                                label={'Código de seguridad'}
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(cvv) => this.setState({ cvv })}
                                value={this.state.cvv}
                                keyboardType="numeric" autoCorrect={false} />
                            <TouchableOpacity style={styles.boton} onPress={this.registrar.bind(this)}>
                                <Text style={styles.texto}>Registrarse</Text>
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
    datepicker: {
        width: '90%',
        height: 40,
        marginVertical: 10
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
