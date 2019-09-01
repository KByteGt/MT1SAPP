import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class RegistroMecanico3 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            anio: '',
            placa: '',

            marcas: [],
            idMarcaMoto: '',
            labelMarcaMoto: '',

            lineas: [],
            idLineaMoto: '',
            labelLineaMoto: ''
        };

        this.getMarcas();
        this.getLineas(1);

    }

    pickerChangeMarcas(index) {
        this.state.marcas.map((v, i) => {
            if (index === i) {
                this.setState({
                    idMarcaMoto: this.state.marcas[index].idMarcaMoto,
                    labelMarcaMoto: this.state.marcas[index].nombre
                })

                this.getLineas(this.state.marcas[index].idMarcaMoto);
            }
        })
    }

    pickerChangeLineas(index) {
        this.state.lineas.map((v, i) => {
            if (index === i) {
                this.setState({
                    idLineaMoto: this.state.lineas[index].idLineaMoto,
                    labelLineaMoto: this.state.lineas[index].nombre
                })
            }
        })
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    getMarcas = () => {
        var url = '/Moto/ObtenerMarcaMoto';
        axios.get(url)
            .then(response => {
                this.setState({
                    marcas: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    getLineas = (idMarcaMoto) => {
        var url = '/Moto/ObtenerLineaMoto';
        axios.post(url, {
            idMarcaMoto: idMarcaMoto
        })
            .then(response => {
                this.setState({
                    lineas: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    siguiente = () => {

        const valido = this.validate({
            placa: { required: true },
            anio: { minlength: 4, maxlength: 4, numbers: true },
            idMarcaMoto: { required: true },
            idLineaMoto: { required: true }
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            this.props.navigation.navigate('RegistroMecanico4', {
                email: params.email,
                password: params.password,
                nombre: params.nombre,
                apellido: params.apellido,
                telefono: params.telefono,
                dpi: params.dpi,
                direccion: params.direccion,
                nit: params.nit,
                idPais: params.idPais,
                placa: this.state.placa,
                anio: this.state.anio,
                idMarcaMoto: this.state.idMarcaMoto,
                idLineaMoto: this.state.idLineaMoto
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
                            <Text style={styles.titulo3}>Datos de la moto 3/4</Text>
                            <Fumi
                                style={styles.input}
                                label={'Placa'}
                                iconClass={FontAwesomeIcon}
                                iconName={'motorcycle'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(placa) => this.setState({ placa })}
                                value={this.state.placa}
                                autoCorrect={false} />
                            <Fumi
                                style={styles.input}
                                label={'Año'}
                                iconClass={FontAwesomeIcon}
                                iconName={'calendar'}
                                iconColor={'rgb(255,101,42)'}
                                onChangeText={(anio) => this.setState({ anio })}
                                value={this.state.anio}
                                keyboardType="numeric" autoCorrect={false} />
                            <Text style={styles.subtitulo}>Marca</Text>
                            <Picker
                                selectedValue={this.state.idMarcaMoto}
                                style={styles.combo}
                                onValueChange={(itemValue, itemIndex) => this.pickerChangeMarcas(itemIndex)}>{
                                    this.state.marcas.map((v) => {
                                        return <Picker.Item label={v.nombre} value={v.idMarcaMoto} />
                                    })
                                }
                            </Picker>
                            <Text style={styles.subtitulo}>Línea</Text>
                            <Picker
                                selectedValue={this.state.idLineaMoto}
                                style={styles.combo}
                                onValueChange={(itemValue, itemIndex) => this.pickerChangeLineas(itemIndex)}>{
                                    this.state.lineas.map((v) => {
                                        return <Picker.Item label={v.nombre} value={v.idLineaMoto} />
                                    })
                                }
                            </Picker>
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
