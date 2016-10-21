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
import Drawer from 'react-native-drawer';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// -----------------
// my imports
import config from './config';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import SideMenu from './SideMenu';
import * as reducers from './reducers';
//-----------
// END IMPORTS =================================================================
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};

class MyDrawer extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type="displace"
        content={<SideMenu />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
      );
  }
}

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

          <Scene key="first"
            component={FirstScreen}
            title="First Screen"
            initial
            hideNavBar
          />
          <Scene key="drawer" component={MyDrawer} open={false} duration={0}>
            <Scene key="tabbed"
              tabs
              tabBarStyle={{ backgroundColor: '#FFFFFF' }}
            >
              <Scene key="tab1" title="Tab 1" icon={TabIcon}>
                <Scene key="second"
                  component={SecondScreen}
                  title="Second Screen"
                />
              </Scene>
              <Scene key="tab2" title="Tab 2" icon={TabIcon}>
                <Scene key="third"
                  component={ThirdScreen}
                  title="Third Screen"
                />
              </Scene>
            </Scene>
          </Scene>

        </Scene>
      </RouterWithRedux>
    </ApolloProvider>
  );
};


export default App;
