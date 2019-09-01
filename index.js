/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

axios.defaults.baseURL = 'http://18.218.222.227:3000'

AppRegistry.registerComponent(appName, () => App);
