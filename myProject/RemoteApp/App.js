import React, { Component } from 'react';
import {
  Gyroscope,
} from 'expo';
window.navigator.userAgent = 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


export default class GyroscopeSensor extends React.Component {
  constructor() {
    super();
    this.ws = new WebSocket('http://b0565861.ngrok.io', null, {headers: {
        type: "MOBILE",
        name: "test"
    }});
    this.wsFound = false;
    this.ws.onopen = () => {
        // connection opened
        this.wsFound = true;
        this.ws.send('something'); // send a message
    };
}
  state = {
    gyroscopeData: {},
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  }

  _fast = () => {
    Gyroscope.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Gyroscope.addListener((result) => {
      this.setState({gyroscopeData: result});
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  
  
  render() {
    let { x, y, z } = this.state.gyroscopeData;

    // this.ws = new WebSocket('http://77d6dce4.ngrok.io');
    // this.ws.onopen = () => {
    //   // connection opened
    //   this.ws.send('something'); // send a message
    // };
    if(this.wsFound) {
        // this.ws.send(JSON.stringify({x: x, y: y, z: z}));
    } 



    return (
      <View style={styles.sensor}>
        <Text>Gyroscope:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});