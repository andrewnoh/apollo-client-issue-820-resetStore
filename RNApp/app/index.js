// react, react-native, native-base imports
import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
// ----------------------------------------
// secondary imports
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import { Router, Scene, Actions, DefaultRenderer } from 'react-native-router-flux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// -----------------
// my imports
import config from './config';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import * as reducers from './reducers';
//-----------
// END IMPORTS =================================================================
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

const client = new ApolloClient({
  networkInterface: createNetworkInterface(config.server.url),
});

const logger = createLogger();

const enhancers = [
  applyMiddleware(client.middleware(), logger),
  devTools(),
];
// const { count, router } = reducers;
const rootReducer = combineReducers({
  ...reducers,
  apollo: client.reducer(),
});
const store = createStore(rootReducer, {}, compose(...enhancers));

const RouterWithRedux = connect()(Router);

const App = () => {
  return (
    <ApolloProvider client={client} store={store}>
      <RouterWithRedux>
        <Scene key="root">

          <Scene key="first" type="reset"
            component={FirstScreen}
            title="First Screen"
            initial
            hideNavBar
          />

          <Scene key="second"
            component={SecondScreen}
            title="Second Screen"
          />

        </Scene>
      </RouterWithRedux>
    </ApolloProvider>
  );
};


export default App;
