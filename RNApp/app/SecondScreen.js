// react, react-native, native-base imports
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// ----------------------------------------
// secondary imports
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

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Second Screen
      </Text>
    </View>
  );
};


export default SecondScreen;
