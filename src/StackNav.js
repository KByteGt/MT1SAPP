import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Inicio from './Inicio';
import Perfil from './Perfil';
import CambiarPassword from './CambiarPassword';
import Vehiculo from './Vehiculo';
import CrearVehiculo from './CrearVehiculo';
import CrearOrden from './CrearOrden';
import CrearOrden2 from './CrearOrden2';
import CrearOrden3 from './CrearOrden3';
import CrearOrden4 from './CrearOrden4';
import CrearOrden5 from './CrearOrden5';
import Orden from './Orden';

const StackNav = createStackNavigator({
    Inicio: {
        screen: Inicio,
        navigationOptions: ({ navigation }) => ({
            title: "Inicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CambiarPassword: {
        screen: CambiarPassword,
        navigationOptions: ({ navigation }) => ({
            title: "Modificar contraseña",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    Perfil: {
        screen: Perfil,
        navigationOptions: ({ navigation }) => ({
            title: "Modificar perfil",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    Vehiculo: {
        screen: Vehiculo,
        navigationOptions: ({ navigation }) => ({
            title: "Mis vehículos",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearVehiculo: {
        screen: CrearVehiculo,
        navigationOptions: ({ navigation }) => ({
            title: "Crear vehículo",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearOrden: {
        screen: CrearOrden,
        navigationOptions: ({ navigation }) => ({
            title: "Solicitud de servicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearOrden2: {
        screen: CrearOrden2,
        navigationOptions: ({ navigation }) => ({
            title: "Solicitud de servicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearOrden3: {
        screen: CrearOrden3,
        navigationOptions: ({ navigation }) => ({
            title: "Solicitud de servicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearOrden4: {
        screen: CrearOrden4,
        navigationOptions: ({ navigation }) => ({
            title: "Solicitud de servicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    CrearOrden5: {
        screen: CrearOrden5,
        navigationOptions: ({ navigation }) => ({
            title: "Solicitud de servicio",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    },
    Orden: {
        screen: Orden,
        navigationOptions: ({ navigation }) => ({
            title: "Ordenes para atender",
            headerRight: (
                <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
                    <View style={styles.logo}>
                        <Image source={require('../img/icon-menu.png')} style={{ width: 24, height: 24 }} />
                    </View>
                </TouchableOpacity>
            ),
            headerTintColor: '#fff',
            headerStyle: {
                paddingRight: 10,
                paddingLeft: 15,
                backgroundColor: 'rgb(255,101,42)'
            }
        })
    }
});

export default StackNav;

const styles = StyleSheet.create({
    logo: {
        padding: 5,
        alignItems: 'center',
        justifiContent: 'center'
    }
});
