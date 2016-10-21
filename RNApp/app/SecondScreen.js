// react, react-native, native-base imports
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Spinner, Button } from 'native-base';
// ----------------------------------------
// secondary imports
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// -----------------
// my imports
//-----------
// END IMPORTS =================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hotpink',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

class SecondScreen extends Component {
  constructor(props) {
    super();
  }

  logout() {
    const { client } = this.props;

    Actions.first();
    // wait 5 seconds to make sure we're definitely out of this component,
    // back to first screen,
    // and APOLLO_QUERY_STOP happened
    setTimeout(() => client.resetStore(), 5000);
  }

  render() {
    const { loading, fortuneCookie } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Second Screen
        </Text>
        {loading ? <Spinner color="blue" /> : <Text>{fortuneCookie}</Text>}
        <Button onPress={() => this.logout()}>Logout</Button>
      </View>
    );
  }
}

const FortuneCookie = gql`query FortuneCookie
  {
    getFortuneCookie
  }
`;
const SecondScreenWithData = graphql(FortuneCookie, {
  props: ({ ownProps, data }) => {
    if (data.loading) return { loading: true };
    if (data.error) console.log(data.error);
    return {
      fortuneCookie: data.getFortuneCookie,
    };
  },
})(SecondScreen);

export default withApollo(SecondScreenWithData);
