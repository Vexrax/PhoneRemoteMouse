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
    this.ws = new WebSocket('ws://localhost:5000', null, {headers: {
        type: "MOBILE",
        name: "test"
    }});
    while (!this.ws.CLOSED) {
        console.log('fak');
    }
    this.wsFound = false;
    console.log("starting");
    this.ws.onopen = () => {
        // connection opened
        this.setState({connected:true})
        this.wsFound = true;
        console.log("Joined socket");
        this.emit = this.emit.bind(this);   
    };
    this.ws.onclose = (e) => {
        console.log('kys');
        console.log(e.code);
        console.log(e.reason);
    }
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

  _sendLeftClick = () => {
    if(this.wsFound)
    {
      let { x, y, z } = this.state.gyroscopeData;
      this.ws.send(JSON.stringify({x:x, y:y, z:z, eventType:"EVENT_LEFT_CLICK"}));
      console.log(x+", "+ y+", "+z+", left");
    }
  }

  _sendRightClick = () => {
    if(this.wsFound)
    {
      let { x, y, z } = this.state.gyroscopeData;
      this.ws.send(JSON.stringify({x:x, y:y, z:z, eventType:"EVENT_RIGHT_CLICK"}));
      console.log(x+", "+ y+", "+z+", right");
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
    // };
    if(this.wsFound) {
        this.index=this.index+1;
        this.ws.send(JSON.stringify({x: x, y: y, z: z, i:this.index, eventType:"EVENT_MOVE"}));
    } 

    return (
      <View style={styles.sensor}>

        <View style={styles.mContainer}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._sendLeftClick}  style={styles.lbutton}>
            <Text>L</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._sendRightClick} style={styles.rbutton}>
            <Text style={styles.rightbuttontext}>R</Text>
          </TouchableOpacity>
        </View>
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