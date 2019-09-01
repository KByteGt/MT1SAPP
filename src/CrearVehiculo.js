import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class CrearVehiculo extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            nombre: '',
            anio: '',

            marcas: [],
            idMarcaVehiculo: '',
            labelMarcaVehiculo: '',

            lineas: [],
            idLineaVehiculo: '',
            labelLineaVehiculo: '',

            tipos: [],
            idTipoVehiculo: '',
            labelTipoVehiculo: '',

            combustibles: [],
            idTipoCombustible: '',
            labelTipoCombustible: '',

            tamanios: [],
            idTamanioMotor: '',
            labelTamanioMotor: '',
        };

        this.getMarcas();
        this.getLineas(1);
        this.getTipos();
        this.getCombustibles();
        this.getTamanios();
    }

    pickerChangeMarcas(index) {
        this.state.marcas.map((v, i) => {
            if (index === i) {
                this.setState({
                    idMarcaVehiculo: this.state.marcas[index].idMarcaVehiculo,
                    labelMarcaVehiculo: this.state.marcas[index].nombre
                })

                this.getLineas(this.state.marcas[index].idMarcaVehiculo);
            }
        })
    }

    pickerChangeLineas(index) {
        this.state.lineas.map((v, i) => {
            if (index === i) {
                this.setState({
                    idLineaVehiculo: this.state.lineas[index].idLineaVehiculo,
                    labelLineaVehiculo: this.state.lineas[index].nombre
                })
            }
        })
    }

    pickerChangeTipos(index) {
        this.state.tipos.map((v, i) => {
            if (index === i) {
                this.setState({
                    idTipoVehiculo: this.state.tipos[index].idTipoVehiculo,
                    labelTipoVehiculo: this.state.tipos[index].nombre
                })
            }
        })
    }

    pickerChangeCombustibles(index) {
        this.state.combustibles.map((v, i) => {
            if (index === i) {
                this.setState({
                    idTipoCombustible: this.state.combustibles[index].idTipoCombustible,
                    labelTipoCombustible: this.state.combustibles[index].nombre
                })
            }
        })
    }

    pickerChangeTamanios(index) {
        this.state.tamanios.map((v, i) => {
            if (index === i) {
                this.setState({
                    idTamanioMotor: this.state.tamanios[index].idTamanioMotor,
                    labelTamanioMotor: this.state.tamanios[index].tamanio
                })
            }
        })
    }

    handleClose = () => {
        this.setState({ show: false });
        
        if (this.state.estilo === 'success') {
            this.props.navigation.goBack();
        }
    }

    getMarcas = () => {
        var url = '/Vehiculo/ObtenerMarcaVehiculo';
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

    getLineas = (idMarcaVehiculo) => {
        var url = '/Vehiculo/ObtenerLineaVehiculo';
        axios.post(url, {
            idMarcaVehiculo: idMarcaVehiculo
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

    getTipos = () => {
        var url = '/Vehiculo/ObtenerTipoVehiculo';
        axios.get(url)
            .then(response => {
                this.setState({
                    tipos: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    getCombustibles = () => {
        var url = '/Vehiculo/ObtenerTipoCombustible';
        axios.get(url)
            .then(response => {
                this.setState({
                    combustibles: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    getTamanios = () => {
        var url = '/Vehiculo/ObtenerTamanioMotor';
        axios.get(url)
            .then(response => {
                this.setState({
                    tamanios: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    crear = () => {

        const valido = this.validate({
            nombre: { required: true, maxlength: 24 },
            anio: { minlength: 4, maxlength: 4, numbers: true },
            idMarcaVehiculo: { required: true },
            idLineaVehiculo: { required: true },
            idTipoVehiculo: { required: true },
            idTipoCombustible: { required: true },
            idTamanioMotor: { required: true },
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            var url = '/Vehiculo/InsertarVehiculoCliente';
            axios.post(url, {
                idUsuario: this.state.idUsuario,
                nombre: this.state.nombre,
                anio: this.state.anio,
                idMarcaVehiculo: this.state.idMarcaVehiculo,
                idLineaVehiculo: this.state.idLineaVehiculo,
                idTipoVehiculo: this.state.idTipoVehiculo,
                idTipoCombustible: this.state.idTipoCombustible,
                idTamanioMotor: this.state.idTamanioMotor,
            })
                .then(response => {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                })
                .catch(error => {
                    this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
                });
        }
    };

    componentDidMount() {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;

        this.setState({ idUsuario: idUsuario });

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
                        <Text style={styles.titulo}>Características del vehículo</Text>
                        <Fumi
                            style={styles.input}
                            label={'Nombre'}
                            iconClass={FontAwesomeIcon}
                            iconName={'car'}
                            iconColor={'rgb(255,101,42)'}
                            onChangeText={(nombre) => this.setState({ nombre })}
                            value={this.state.nombre}
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
                            selectedValue={this.state.idMarcaVehiculo}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeMarcas(itemIndex)}>{
                                this.state.marcas.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idMarcaVehiculo} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Línea</Text>
                        <Picker
                            selectedValue={this.state.idLineaVehiculo}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeLineas(itemIndex)}>{
                                this.state.lineas.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idLineaVehiculo} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Tipo de vehículo</Text>
                        <Picker
                            selectedValue={this.state.idTipoVehiculo}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeTipos(itemIndex)}>{
                                this.state.tipos.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idTipoVehiculo} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Tipo de combustible</Text>
                        <Picker
                            selectedValue={this.state.idTipoCombustible}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeCombustibles(itemIndex)}>{
                                this.state.combustibles.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idTipoCombustible} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Tamaño del motor</Text>
                        <Picker
                            selectedValue={this.state.idTamanioMotor}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeTamanios(itemIndex)}>{
                                this.state.tamanios.map((v) => {
                                    return <Picker.Item label={v.tamanio} value={v.idTamanioMotor} />
                                })
                            }
                        </Picker>
                        <TouchableOpacity style={styles.boton} onPress={this.crear.bind(this)}>
                            <Text style={styles.texto}>Crear</Text>
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
