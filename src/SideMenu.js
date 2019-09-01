import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

export default class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            estilo: 'info',
            show: false,
            titulo: '',
            subtitulo: '',

        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {

        const { navigation } = this.props;
        const idUsuario = navigation.getParam('idUsuario');
        const tipo = navigation.getParam('tipo');

        const vacio = <View></View>
        const password = <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CambiarPassword', { idUsuario: idUsuario })}>
                <Image source={require('../img/icon-person.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                <Text style={styles.link}>Modificar contraseña</Text>
            </TouchableOpacity>
        </View>
        const ordenes = <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Orden', { idUsuario: idUsuario })}>
                <Image source={require('../img/icon-herramienta.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                <Text style={styles.link}>Ordenes</Text>
            </TouchableOpacity>
        </View>

        const perfil = <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Perfil', { idUsuario: idUsuario })}>
                <Image source={require('../img/icon-person.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                <Text style={styles.link}>Modificar perfil</Text>
            </TouchableOpacity>
        </View>
        const vehiculo = <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Vehiculo', { idUsuario: idUsuario })}>
                <Image source={require('../img/icon-car.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                <Text style={styles.link}>Mis vehículos</Text>
            </TouchableOpacity>
        </View >
        const solicitud = <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CrearOrden', { idUsuario: idUsuario })}>
                <Image source={require('../img/icon-herramienta2.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                <Text style={styles.link}>Solicitud de servicio</Text>
            </TouchableOpacity>
        </View>

        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={require('../img/logo-Mantto-color.png')} style={{ width: 110, height: 80 }} />
                </View>
                <ScrollView>
                    <SCLAlert
                        onRequestClose={() => this.setState({ show: false })}
                        theme={this.state.estilo}
                        show={this.state.show}
                        title={this.state.titulo}
                        subtitle={this.state.subtitulo}>
                        <SCLAlertButton theme={this.state.estilo} onPress={this.handleClose.bind(this)}>Aceptar</SCLAlertButton>
                    </SCLAlert>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Inicio')}>
                                <Image source={require('../img/icon-door.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                                <Text style={styles.link}>Inicio</Text>
                            </TouchableOpacity>
                        </View>
                        {tipo == 0 ? password : perfil}
                        {tipo == 0 ? vacio : vehiculo}
                        {tipo == 0 ? ordenes : solicitud}
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Splash')}>
                                <Image source={require('../img/icon-door.png')} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                                <Text style={styles.link}>Cerrar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>Mantto</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 10,
        backgroundColor: 'lightgrey'
    },
    logo: {
        padding: 20,
        alignItems: 'center',
        justifiContent: 'center',
        height: 130
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifiContent: 'center',
        padding: 10
    },
    link: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgb(255,101,42)'
    }
});
