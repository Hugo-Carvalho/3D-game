import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Header from '../common/header/Header';
import Home from '../home/Home';
import NotFound from '../common/not-found/NotFound';
import LoadingIndicator from '../common/loading-indicator/LoadingIndicator';

import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { Helmet } from 'react-helmet';
import './styles/App.css';
import Axios from 'axios';

/**
 * Classe responsavel por renderizar a pagina solicitada
 */
class App extends Component {
  constructor(props) {
    super(props);
    Axios.defaults.baseURL = API_BASE_URL;
    this.state = {
      loading: false
    }
  }

  render() {
    if (this.state.loading) {
      // Se a pagina ainda esta carregando, renderiza o indicador de carregamento
      return (
          <LoadingIndicator />
      );
    }

    return (
      <div className="app">
        <Helmet htmlAttributes={{ lang: 'pt-br' }}>
          <meta charSet="utf-8" />
        </Helmet>
        <div className="app-body">
          <Switch>
            <Route exact path="/" 
              render={(props) => <Home authenticated={this.state.authenticated} currentUser={this.state.currentUser} {...props} />}></Route>
              
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{ limit: 3 }}
          timeout={3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
