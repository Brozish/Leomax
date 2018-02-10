import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import { ConnectedRouter } from 'react-router-redux';

import NotFound from './route/NotFound';
import Subscription from 'Components/Subscription';
import 'normalize.css';

export default class App extends React.Component {
  render() {
    return (
      <ConnectedRouter history = {history}>
        <Switch>
          <Redirect exact from = '/' to = '/subscription' />
          <Route path = '/subscription' component = {Subscription} />
          <Route component = {NotFound} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
