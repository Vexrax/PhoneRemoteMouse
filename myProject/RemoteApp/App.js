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
    this.index=0;
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
        this.index=this.index+1;
         this.ws.send(JSON.stringify({x: x, y: y, z: z, i:this.index}));
    } 

    return (
      <View style={styles.sensor}>

        <View style={styles.mContainer}>
          <TouchableOpacity style={styles.mButton}>
            <Text style={styles.middlebuttontext}>M</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity  style={styles.lbutton}>
            <Text>L</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rbutton}>
            <Text style={styles.rightbuttontext}>R</Text>
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
    flex:1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  lbutton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#660829',
    padding: 10,
    height: '160%'
  },
  rbutton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    height: '160%'
  },
  rightbuttontext:{
    color:'white',
  },
  mContainer: {
    height: '50%'
  },
  mButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },
  middlebuttontext: {
    color: 'white'
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});