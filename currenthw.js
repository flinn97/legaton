import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Checkedd from "./allchecks";
import Leaf from "./leaf.png"
export default class Currenthw extends Component {
    //state creation and binding.
    constructor(props) {
        super(props);
        this.state = {
            homeworks: undefined
        };
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop:50, justifyContent:"space-between" }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize:25 }}>Homework Assignment</Text>
                <View style={{ marginTop:50 }}>

                 <View style={{display:"flex", flexDirection:"row"}} >
                 <Image style={{width:25, height:25, resizeMode: "contain", marginRight:20}} source={Leaf} />
                     <Text style={{fontSize:18, marginTop:5}} >{this.props.state?.homework?.title}</Text></View>
                 </View>
                 </View>
                 <View  style={{marginBottom:90}}>
            <View  style={{display:"flex", flexDirection:"row", marginBottom:60, justifyContent:"center"}}>
            <Checkedd syncedCheckboxes={this.props.state.homework?.hwchecked} homework={true} middlewareDispatch={this.props.middlewareDispatch} size={40} state={this.props.state} student={this.props.state.currentstudent} handleChange={this.props.handleChange} dispatch={this.props.dispatch}/>
                
            </View>
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity onPress={this.props.dispatch.bind(this,{myswitch:"hwtime",})} style={{ width:80, height:30, borderRadius:4,  justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5"}}><Text style={{color:"white"}}>Log Time</Text></TouchableOpacity>
            </View>
            </View>
            </View>
        );
        
    }
}
