import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert, Picker } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';

export default class CrearOrden3 extends ValidationComponent {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

            idUsuario: '',

            aceites: [],
            idMarcaAceite: '',
            labelMarcaAceite: '',

            tipos: [],
            idTipoAceite: '',
            labelTipoAceite: '',

            viscosidades: [],
            idTipoViscosidad: '',
            labelTipoViscosidad: '',

            filtros: [],
            idMarcaFiltroAceite: '',
            labelMarcaFiltroAceite: '',

        };

        this.getAceites();
        this.getTipos();
        this.getViscosidades();
        this.getFiltros();
    }

    pickerChangeAceites(index) {
        this.state.aceites.map((v, i) => {
            if (index === i) {
                this.setState({
                    idMarcaAceite: this.state.aceites[index].idMarcaAceite,
                    labelMarcaAceite: this.state.aceites[index].nombre
                })
            }
        })
    }

    pickerChangeTipos(index) {
        this.state.tipos.map((v, i) => {
            if (index === i) {
                this.setState({
                    idTipoAceite: this.state.tipos[index].idTipoAceite,
                    labelTipoAceite: this.state.tipos[index].nombre
                })
            }
        })
    }

    pickerChangeViscosidades(index) {
        this.state.viscosidades.map((v, i) => {
            if (index === i) {
                this.setState({
                    idTipoViscosidad: this.state.viscosidades[index].idTipoViscosidad,
                    labelTipoViscosidad: this.state.viscosidades[index].nombre
                })
            }
        })
    }

    pickerChangeFiltros(index) {
        this.state.filtros.map((v, i) => {
            if (index === i) {
                this.setState({
                    idMarcaFiltroAceite: this.state.filtros[index].idMarcaFiltroAceite,
                    labelMarcaFiltroAceite: this.state.filtros[index].nombre
                })
            }
        })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    getAceites = () => {
        var url = '/Aceite/ObtenerMarcaAceite';
        axios.get(url)
            .then(response => {
                this.setState({
                    aceites: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    getTipos = () => {
        var url = '/Aceite/ObtenerTipoAceite';
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

    getViscosidades = () => {
        var url = '/Aceite/ObtenerTipoViscosidad';
        axios.get(url)
            .then(response => {
                this.setState({
                    viscosidades: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    getFiltros = () => {
        var url = '/Aceite/ObtenerMarcaFiltroAceite';
        axios.get(url)
            .then(response => {
                this.setState({
                    filtros: response.data,
                })
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });
    };

    siguiente = () => {

        const valido = this.validate({
            idMarcaAceite: { required: true },
            idTipoAceite: { required: true },
            idTipoViscosidad: { required: true },
            idMarcaFiltroAceite: { required: true },
        });

        if (!valido) {
            this.setState({ estilo: 'warning', show: true, titulo: 'Advertencia', subtitulo: this.getErrorMessages() });
        } else {
            const { params } = this.props.navigation.state;

            this.props.navigation.navigate('CrearOrden4', {
                idUsuario: params.idUsuario,
                idServicio: params.idServicio,
                idVehiculoCliente: params.idVehiculoCliente,
                fechaHoraInicio: params.fechaHoraInicio,
                direccion: params.direccion,
                latitud: params.latitud,
                longitud: params.longitud,
                idMarcaAceite: this.state.idMarcaAceite,
                idTipoAceite: this.state.idTipoAceite,
                idTipoViscosidad: this.state.idTipoViscosidad,
                idMarcaFiltroAceite: this.state.idMarcaFiltroAceite,
            });
        }
    };

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
                        <Text style={styles.titulo3}>Características del aceite 3/5</Text>
                        <Text style={styles.subtitulo}>Marca de aceite</Text>
                        <Picker
                            selectedValue={this.state.idMarcaAceite}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeAceites(itemIndex)}>{
                                this.state.aceites.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idMarcaAceite} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Tipo de aceite</Text>
                        <Picker
                            selectedValue={this.state.idTipoAceite}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeTipos(itemIndex)}>{
                                this.state.tipos.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idTipoAceite} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Tipo de viscosidad</Text>
                        <Picker
                            selectedValue={this.state.idTipoViscosidad}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeViscosidades(itemIndex)}>{
                                this.state.viscosidades.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idTipoViscosidad} />
                                })
                            }
                        </Picker>
                        <Text style={styles.subtitulo}>Marca de filtro de aceite</Text>
                        <Picker
                            selectedValue={this.state.idMarcaFiltroAceite}
                            style={styles.combo}
                            onValueChange={(itemValue, itemIndex) => this.pickerChangeFiltros(itemIndex)}>{
                                this.state.filtros.map((v) => {
                                    return <Picker.Item label={v.nombre} value={v.idMarcaFiltroAceite} />
                                })
                            }
                        </Picker>
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
