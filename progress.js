import React, { Component } from "react";
import Circle from "./progressCircle.js";
import starpointService from "./services/starpointService.js";
// import AuthService from "./services/auth.service";

import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput,} from 'react-native';

import Bar from "./progressbar.js"

export default class Homework extends Component {

    //state creation and binding.
    constructor(props) {
        super(props);
       

        this.state = {
            time:0,
            spstuff: 0
        };
    }
    componentDidMount(){
    let sum=0;
    for(const key in this.props.state.currentstudent.getJson().hwtime){
        sum += parseInt(this.props.state.currentstudent.hwtime[key])
    }
    let spstuff = starpointService.getstarpointgoalandlevel(parseInt(this.props.state.currentstudent.starpoints)).spgoal
    this.setState({
        time:sum,
        spstuff:spstuff
    })
    }
    render() {
        //login page for the screen. 
        return (
            <View style={{marginTop:40}}>
                <View style={{marginBottom:40,  alignItems:"center"}}>
           {/* <Circle props={this.props}/> */}
           <Text >Goal Progress</Text>
           <View style={{marginBottom:30}}>
           <Bar spGoal={this.state.spstuff} starpoints={this.props.state.spamount} text={"Starpoints"}/>
           </View>
           </View>
            </View>
        );
    }
}
