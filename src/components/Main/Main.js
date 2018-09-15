import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '@/components/Home';
import LibraryContainer from '@/containers/Library';
import MaterialContainer from '@/containers/Material';
import Error from '@/components/Error';

const renderError = () => <Error status={404} />;

const Main = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={Home}
    />
    <Route
      exact
      path="/library"
      component={LibraryContainer}
    />
    <Route
      exact
      path="/materials/:endpoint/:id"
      component={MaterialContainer}
    />
    <Route
      path="**"
      render={renderError}
    />
  </Switch>
);

export default Main;
