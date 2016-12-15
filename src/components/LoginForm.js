import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({  
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  
  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    } 

    return <Button onPress={this.onButtonPress.bind(this)}> Login / Signup </Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            placeHolder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeHolder="password"
            label="Password"
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry 
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
