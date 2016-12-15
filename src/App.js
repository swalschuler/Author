import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

firebase.initializeApp({
  apiKey: 'AIzaSyAFFtpXKLZJ-bK54MxnRSZkUzLGon0GlZM',
  authDomain: 'author-72ba6.firebaseapp.com',
  databaseURL: 'https://author-72ba6.firebaseio.com',
  storageBucket: 'author-72ba6.appspot.com',
  messagingSenderId: '789804978650'
});

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.contentStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );

      case false:
        return <LoginForm />;

      default:
        return (
          <View style={styles.contentStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authorization" />
        { this.renderContent() }
      </View>
    );
  }
}

const styles = {
  contentStyle: {
    padding: 5,
    justifyContent: 'flex-start', 
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  }
};

export default App;
