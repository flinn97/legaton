import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Checkedd from "./allchecks";
import Leaf from "./leaf.png"
export default class TimerComponent extends Component {
    constructor(props) {
        super(props);


        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            mCount: 0,
            sCount: 0,
            timer: false,
            m2: "0",
            s2: "0",
        }

    };
 

    render() {
        let state = this.props.state;
        let styles = state.styles;
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop:50, justifyContent:"center" }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize:25 }}>Timer</Text>
                <View >
                {this.state.m2}{this.state.mCount}:
            
            {this.state.s2}{this.state.sCount}
            Minutes
                 </View>
                 <TouchableOpacity style={
            {...styles.buttons.buttonRound,
                color: styles.colors.color1, marginRight:"2px"
            }
        } 
                    
                    onClick={ async ()=>{
                        
                        await this.setState({timer:true});

                        while(this.state.timer){
                           
                            if(this.state.timer){
                                let sCount = this.state.sCount+1;
                                let mCount = this.state.mCount;
                                let s2 = "0";
                                let m2 = "0";
                                
                                if(sCount===60){
                                    sCount=1
                                    mCount++;
                                }

                                if(sCount>=10){
                                    s2=""
                                } else {
                                    s2="0"
                                }

                                if(mCount>=10){
                                    m2=""
                                } else {
                                    m2="0"
                                }


                                this.setState({
                                    mCount:mCount,
                                    sCount:sCount,
                                    s2: s2,
                                    m2: m2
                                })
                            }
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            await delay(1000);
                           
                        }
                        


                    }}>Start
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1, marginLeft:"2px"}}
                    onClick={()=>{
                        this.setState({timer:false});
                    }}>Stop
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{...styles.buttons.buttonRound,
                            color: styles.colors.color1,}}
                    onClick={()=>{
                        this.setState({timer:false, sCount:0, mCount:0});
                    }}>Reset
                    </TouchableOpacity>
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
