import angular from 'angular';
import components from './components';
import services from './services';
import 'normalize.css';
import './scss/main.scss';

import uiRouter from 'angular-ui-router';
import 'angular-ui-router/release/stateEvents';

import dialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

import routes from './routes';
import http from './auth/http';
import auth from './auth/auth';

const app = angular.module('Santa', [
  components,
  services,
  uiRouter,
  angular.module('ui.router.state.events').name,
  dialog,

]);
app.constant('apiUrl', process.env.API_URL != null ? process.env.API_URL : 'http://localhost:3000' );

app.config(http);
app.config(routes);

app.run(auth);