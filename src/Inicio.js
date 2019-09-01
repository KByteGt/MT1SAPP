import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import { createOpenLink } from 'react-native-open-maps';
import openMap from 'react-native-open-maps';
import axios from 'axios';
var dateFormat = require('dateformat');

export default class Inicio extends Component {

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
            idPais: '',

            ordenes: [],

            latitud: '',
            longitud: ''
        };

    }

    handleClose = () => {
        this.setState({ show: false });

        this.cargar();
    }

    obtenerEstado = (idOrden) => {

        var url = '/Orden/ObtenerEstadoOrden';
        axios.post(url, {
            idOrden: idOrden
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    var estado = '';
                    if (response.data[0].estado == '0') {
                        estado = 'En espera de mecánico'
                    } else if (response.data[0].estado == '1') {
                        estado = 'Orden atendida por un mecánico'
                    } else if (response.data[0].estado == '2') {
                        estado = 'Llegando al lugar'
                    } else if (response.data[0].estado == '3') {
                        estado = 'Iniciando orden'
                    } else if (response.data[0].estado == '4') {
                        estado = 'Orden finalizada'
                    } else if (response.data[0].estado == '5') {
                        estado = 'Orden cerrada'
                    }
                    this.setState({ estilo: 'info', show: true, titulo: 'Estado', subtitulo: estado });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    actualizarEstado = (idOrden, valor) => {

        var url = '/Orden/ActualizarEstadoOrden';
        axios.post(url, {
            idOrden: idOrden,
            valor: valor,
            fechaHoraFin: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
        })
            .then(response => {
                this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    obtenerPerfilMecanico = (idOrden) => {

        var url = '/Orden/ObtenerPerfilMecanicoOrden';
        axios.post(url, {
            idOrden: idOrden
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    var datos = 'Nombre: ' + response.data[0].nombre + ' ' + response.data[0].apellido + '\nTeléfono: ' + response.data[0].telefono;
                    this.setState({ estilo: 'info', show: true, titulo: 'Datos del Mecánico', subtitulo: datos });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    obtenerPerfilCliente = (idOrden) => {

        var url = '/Orden/ObtenerPerfilClienteOrden';
        axios.post(url, {
            idOrden: idOrden
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    var datos = 'Nombre: ' + response.data[0].nombre + ' ' + response.data[0].apellido + '\nTeléfono: ' + response.data[0].telefono;
                    this.setState({ estilo: 'info', show: true, titulo: 'Datos del Cliente', subtitulo: datos });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    cargar() {

        const { params } = this.props.navigation.state;
        const idUsuario = params.idUsuario;
        const tipo = params.tipo;

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

        var url = '';
        if (tipo == 0) {
            url = '/Orden/ObtenerOrdenMecanico';
        } else if (tipo == 1) {
            url = '/Orden/ObtenerOrdenCliente';
        }
        axios.post(url, {
            idUsuario: idUsuario
        })
            .then(response => {
                if (response.data.mensaje === undefined) {
                    this.setState({
                        ordenes: response.data
                    });
                } else {
                    this.setState({ estilo: response.data.estilo, show: true, titulo: response.data.titulo, subtitulo: response.data.mensaje });
                }
            })
            .catch(error => {
                this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: error });
            });

    }

    findCoordinates = () => {

        navigator.geolocation.getCurrentPosition((position) => {

            this.setState({
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
            });

        },
            (error) => this.setState({ estilo: 'danger', show: true, titulo: 'Error', subtitulo: 'Asegurate de tener activado el GPS y darle permisos a Mantto para acceder a tu ubicación.' }),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );

    }

    componentWillMount() {

        this.props.navigation.addListener('didFocus', () => {
            this.cargar();
            this.findCoordinates();
        });
    }

    render() {

        const { params } = this.props.navigation.state;
        const tipo = params.tipo;

        const vacio = <View></View>

        const ordenes = this.state.ordenes.map((orden, i) => {

            const cantidad_aceite = <Text style={styles.subtitulo}>Cantidad de aceite {orden.cantidad_aceite} lts</Text>

            const mecanico_ubicacion = <TouchableOpacity style={styles.button} onPress={createOpenLink({ travelType: 'drive', start: this.state.latitud + ',' + this.state.longitud, end: orden.latitud + ',' + orden.longitud, provider: 'google' })}>
                <Text style={styles.link}>Abrir Google Maps</Text>
            </TouchableOpacity>

            const cliente_ubicacion = <TouchableOpacity style={styles.button} onPress={() => openMap({ latitude: this.state.latitud, longitude: this.state.longitud, provider: 'google', zoom: 30 })}>
                <Text style={styles.link}>Abrir Google Maps</Text>
            </TouchableOpacity>

            const mecanico_datos = <TouchableOpacity style={styles.button} onPress={this.obtenerPerfilCliente.bind(this, orden.idOrden)}>
                <Text style={styles.link}>Consultar al Cliente</Text>
            </TouchableOpacity>

            const cliente_datos = <TouchableOpacity style={styles.button} onPress={this.obtenerPerfilMecanico.bind(this, orden.idOrden)}>
                <Text style={styles.link}>Consultar al Mecánico</Text>
            </TouchableOpacity>

            const mecanico_estado = <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.boton} onPress={this.actualizarEstado.bind(this, orden.idOrden, '2')}>
                    <Text style={styles.texto}>Llegando al lugar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={this.actualizarEstado.bind(this, orden.idOrden, '3')}>
                    <Text style={styles.texto}>Iniciando orden</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={this.actualizarEstado.bind(this, orden.idOrden, '4')}>
                    <Text style={styles.texto}>Orden finalizada</Text>
                </TouchableOpacity>
            </View>

            const cliente_estado = <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.button} onPress={this.obtenerEstado.bind(this, orden.idOrden)}>
                    <Text style={styles.link}>Ver estado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={this.actualizarEstado.bind(this, orden.idOrden, '5')}>
                    <Text style={styles.texto}>Orden cerrada</Text>
                </TouchableOpacity>
            </View >

            return (
                <View style={styles.card}>
                    <Text style={styles.titulo2}>{orden.servicio}</Text>
                    <Text style={styles.titulo3}>{orden.marcaVehiculo + ' ' + orden.linea}</Text>
                    <Text style={styles.subtitulo}>Año {orden.anio}</Text>
                    <Text style={styles.subtitulo}>{orden.tipoVehiculo} | {orden.combustible}</Text>
                    <Text style={styles.subtitulo}>Motor {orden.tamanio}</Text>
                    <Text style={styles.titulo3}>-</Text>
                    <Text style={styles.subtitulo}>Aceite {orden.marcaAceite}</Text>
                    <Text style={styles.subtitulo}>{orden.tipoAceite} | {orden.viscosidad}</Text>
                    {tipo == 0 ? cantidad_aceite : vacio}
                    <Text style={styles.subtitulo}>Filtro {orden.filtro}</Text>
                    <Text style={styles.titulo3}>-</Text>
                    <Text style={styles.subtitulo}>{dateFormat(orden.fechaHoraInicio, "yyyy-mm-dd HH:MM:ss")}</Text>
                    <Text style={styles.subtitulo}>{orden.direccion}</Text>
                    {tipo == 0 ? mecanico_ubicacion : cliente_ubicacion}
                    {tipo == 0 ? mecanico_datos : cliente_datos}
                    {tipo == 0 ? mecanico_estado : cliente_estado}
                </View>
            )
        })

        return (
            <ScrollView style={styles.container} >
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
                        <Text style={styles.titulo}>Bienvenido</Text>
                        <Text style={styles.titulo2}>{this.state.nombre} {this.state.apellido}</Text>
                        <Text style={styles.subsubtitulo}>{this.state.email}</Text>
                        <Text style={styles.recuadro}>{tipo == 0 ? 'Técnico Mecánico' : 'Cliente'}</Text>
                        <Text style={styles.titulo}>Ordenes en proceso</Text>
                        <View style={styles.cardcontainer}>
                            {ordenes}
                        </View>
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
    cardcontainer: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        marginVertical: 10
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#78909C',
        padding: 15,
        marginVertical: 3
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: '#B02117'
    },
    titulo2: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'rgb(255,101,42)'
    },
    titulo3: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    },
    subtitulo: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5
    },
    caption: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10
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
        marginHorizontal: 20,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgb(255,101,42)',
        backgroundColor: '#fff'
    },
    texto: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    },
    recuadro: {
        flex: 1,
        alignItems: 'center',
        justifiContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgb(255,101,42)',
        color: '#fff'
    }
});
