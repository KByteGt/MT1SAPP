/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation';

import SideMenu from './src/SideMenu'
import StackNav from './src/StackNav';

import Splash from './src/Splash';
import Slide from './src/Slide';
import Login from './src/Login';
import RecuperarPassword from './src/RecuperarPassword';
import RecuperarPassword2 from './src/RecuperarPassword2';
import Registro from './src/Registro';
import RegistroCliente from './src/RegistroCliente';
import RegistroMecanico from './src/RegistroMecanico';
import RegistroMecanico2 from './src/RegistroMecanico2';
import RegistroMecanico3 from './src/RegistroMecanico3';
import RegistroMecanico4 from './src/RegistroMecanico4';

const DrawerNav = createDrawerNavigator(
  {
    StackNav: {
      screen: StackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width - 50,
  }
);

const RootStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: { header: null }
  },
  Slide: {
    screen: Slide,
    navigationOptions: { header: null }
  },
  Login: {
    screen: Login,
    navigationOptions: { header: null }
  },
  RecuperarPassword: {
    screen: RecuperarPassword,
    navigationOptions: { header: null }
  },
  RecuperarPassword2: {
    screen: RecuperarPassword2,
    navigationOptions: { header: null }
  },
  Registro: {
    screen: Registro,
    navigationOptions: { header: null }
  },
  RegistroCliente: {
    screen: RegistroCliente,
    navigationOptions: { header: null }
  },
  RegistroMecanico: {
    screen: RegistroMecanico,
    navigationOptions: { header: null }
  },
  RegistroMecanico2: {
    screen: RegistroMecanico2,
    navigationOptions: { header: null }
  },
  RegistroMecanico3: {
    screen: RegistroMecanico3,
    navigationOptions: { header: null }
  },
  RegistroMecanico4: {
    screen: RegistroMecanico4,
    navigationOptions: { header: null }
  },
  DrawerNav: {
    screen: DrawerNav,
    navigationOptions: { header: null }
  } //Prevent double header
});

export default createAppContainer(RootStack);
