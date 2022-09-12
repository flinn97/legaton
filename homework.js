import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Checkedd from "./allchecks";
import Leaf from "./leaf.png"
export default class Homework extends Component {
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
                <Text style={{ fontSize:25 }}>Homework Assignments</Text>
                <View style={{ marginTop:50 }}>

                 {this.props.state.componentList.getList("homework").map((homework, index)=><TouchableWithoutFeedback onPress={this.props.dispatch.bind(this,{myswitch:"currenthw", homework:homework, })}><View style={{display:"flex", flexDirection:"row"}} key={index}>
                                  
                     <Text style={{fontSize:18, marginTop:5}} key={index}>{homework.getJson().title}</Text>
                     </View></TouchableWithoutFeedback>)}
                 </View>
                 </View>
                 <View  style={{marginBottom:90}}>
            <View  style={{display:"flex", flexDirection:"row", marginBottom:60, justifyContent:"center"}}>
            <Checkedd  homework={false} checked={this.props.state.currentstudent.getJson().syncedCheckboxes}  size={40} state={this.props.state} component={this.props.state.currentstudent} handleChange={this.props.handleChange} dispatch={this.props.dispatch}/>
                
            </View>
            <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <TouchableOpacity  onPress={this.props.dispatch.bind(this,{myswitch:"time",})}  style={{ width:80, height:30, borderRadius:4,  justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5"}}><Text style={{color:"white"}}>Log Time</Text></TouchableOpacity>
            </View>
            </View>
            </View>
        );
        
    }
}
