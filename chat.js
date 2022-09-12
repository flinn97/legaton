import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput,TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
// import { debug } from "react-native-reanimated";
import Checkbox from './checkbox1.js'
import Right from './rightarrow.png';
import Down from './downarrow.png'
export default class Chat extends Component {
    //state creation and binding.
    constructor(props) {
        super(props);
        this.state = {
    }
    
    }
    render() {
        //login page for the screen.
        return (
            <View style={{width:'100%', display:"flex", flexDirection:"row", justifyContent:"center"}} >
               <Text>Chat</Text>
            </View>
        );
    }
}