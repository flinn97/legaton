import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput,TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
// import { debug } from "react-native-reanimated";
import Checkbox from './checkbox.js'
import Right from './rightarrow.png';
import Down from './downarrow.png'
export default class Goals extends Component {
    //state creation and binding.
    constructor(props) {
        super(props);
        this.state = {
        showgoals: true
    }
    
    }
    render() {
        //login page for the screen.
        return (
            <View style={{width:'100%', display:"flex", flexDirection:"row", justifyContent:"center"}} >
                <View style={{width:"92%", marginTop:40}}>
               {this.props.state.componentList.getList("goal")?.map((main, index)=>
                    <View key={index} style={{backgroundColor:"EEEEEE", width:"100%", paddingTop:5, paddingBottom:5 }} onPress={this.showgoal}>
                        {!main.getJson().mainID&&(
                        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between",  paddingLeft:10}}>
                            <View style={{display:"flex", flexDirection:"row", paddingBottom:5, }}>
                                <Checkbox dispatch={this.props.dispatch} size={28} completeGoal={main.getJson().complete} goal={main} main={true}/>
                                    <Text key={index} onPress={(event) => this.showgoal(event, index)} style={{ fontSize:25, textAlign:"center", justifyContent:"space-between", paddingLeft:10, }}>
                                        {main.getJson().title}
                                    </Text>
                            </View>
                                {this.state.showgoals?(
                                    <TouchableWithoutFeedback stlye={{height:30, justifyContent:"center", display:"flex"}} onPress={(event) => this.showgoal(event, index)}>
                                                                        <Image style={{width:20, height:20, resizeMode: "contain", paddingRight:20}} source={Down} />
                                </TouchableWithoutFeedback>
                                
                                ):(
                                    <TouchableWithoutFeedback stlye={{height:30}} onPress={(event) => this.showgoal(event, index)}>
                                            <Image style={{width:30, height:30, resizeMode: "contain", paddingRight:20}} source={Right} />
                                </TouchableWithoutFeedback>
                                )}
                        </View>
                        )}
                        {this.state.showgoals?(<View style={{paddingLeft:30, }}>
                            
                            {this.props.state.componentList.getList("goal")?.map((goal, index)=>
                            <View>
                            {goal.getJson().mainID?.toString()===main?._id?.toString()?(
                                <View style={{display:"flex", flexDirection:"row", paddingBottom:10,paddingTop:10}}>
                                <Checkbox size={20} dispatch={this.props.dispatch} completeGoal={goal.getJson().complete} goal={goal} main={false}/>
                                <Text key={index} style={{  paddingLeft:10,fontSize:20,}}>{goal.getJson().title}</Text>
                                </View>
                            ):(<View></View>)}</View>)}
                            </View>):(<View></View>)}
                    </View>
                                   )} 
            </View>
            </View>
        );
    }
}