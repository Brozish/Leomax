import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';
import { Container } from 'reactstrap';

import NotFound from './route/NotFound';
import Subscription from 'Components/Subscription';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history = {history}>
        <Container>
          <Switch>
            <Redirect exact from = '/' to = '/subscription' />
            <Route exact path = '/subscription' component = {Subscription} />
            <Route component = {NotFound} />
          </Switch>
        </Container>
      </ConnectedRouter>
    );
  }
}
