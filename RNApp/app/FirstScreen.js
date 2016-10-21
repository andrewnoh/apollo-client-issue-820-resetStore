// react, react-native, native-base imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Spinner,
} from 'native-base';
// ----------------------------------------
// secondary imports
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// -----------------
// my imports
import * as actionCreators from './actionCreators';
//-----------
// END IMPORTS =================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  count: {
    fontSize: 30,
    marginTop: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
});

const mapStateToProps = (state) => {
  const { count, routes } = state;
  return {
    count,
    routes,
  };
};
const mapDispatchToProps = (dispatch) => {
  // return {
  //   increment: () => {
  //     dispatch({type: 'INCREMENT'})
  //   }
  // }
  // function increment() {
  //   return {
  //     type: 'INCREMENT'
  //   }
  // }
  // return {
  //   increment: () => dispatch(increment()),
  // };
  // return bindActionCreators({
  //   increment: increment
  // }, dispatch);
  const { increment, decrement } = actionCreators;
  return bindActionCreators({ increment, decrement }, dispatch);
};

const FirstScreen = (props) => {
  const { increment, decrement, count, loading, fortuneCookie, routes } = props;

  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
        onPress={() => Actions.second()}
      >
        {routes.scene.title} (onPress => Second Screen)
      </Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}><Text style={styles.buttonText} onPress={() => increment()}>+</Text></View>
        <View style={styles.button}><Text style={styles.buttonText} onPress={() => decrement()}>-</Text></View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(FirstScreen));
