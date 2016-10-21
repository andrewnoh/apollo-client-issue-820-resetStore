# react-native-redux-apollo-starter

**Includes:**
* React Native - https://facebook.github.io/react-native
* Redux - http://redux.js.org
* Apollo GraphQL Server & Apollo Client (React) - http://dev.apollodata.com/tools/apollo-server, http://dev.apollodata.com/react
* react-native-router-flux - https://github.com/aksonov/react-native-router-flux
* NativeBase - http://nativebase.io/docs/v0.5.7/components
* ESLint Airbnb style - https://github.com/airbnb/javascript

For beginners, shows how to get the **latest and greatest** working together **as simply as possible**. Files just in the same directory with regard to server and client, so things can be more easily understood and modified to your preference. Example GraphQL query gets you a fortune cookie!

![Preview](http://i.imgur.com/NeILFFR.gif)

## Setup Instructions
**1) Start Apollo GraphQL Server**
```
cd ApolloServer
npm install
npm start
```
Try out GraphQL at: `localhost:1337/graphiql`

**2) Start React Native App**
```
cd RNApp
npm install
react-native link
react-native run-ios
```
