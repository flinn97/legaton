import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import SelectDropdown from 'react-native-select-dropdown'
//allows me to create a dialog box to pop up for adding students with names and emails.
export default class Times extends Component {
    constructor(props) {
        super(props);
        this.handletime=this.handletime.bind(this);
        this._getOptionList= this._getOptionList.bind(this);
        this.setday= this.setday.bind(this);

        
        this.state = {
            hwtime: this.props.hwtime,
            day: "mon",
            time: "0",
            days:['monday', "tuesday", "wednesday", "thursday","friday", "saturday","sunday"]

        }
    };
    setday(day){
        this.setState({
            day:day
        })
        console.log(day)
    }
 
    async handletime(){
        let times = this.state.hwtime
        times[this.state.day] = this.state.time;
        if(this.props.homework){
            await this.props.middlewareDispatch({popupswitch: true, myswitch:"update", switchV:false,miscswitch:false, objectattribute:this.state.day, objkey:"homeworks", realobject:{timehw:times},  backendearr:["homeworks"], isobject:true})    
        }
        else{
            await this.props.middlewareDispatch({tick:1, myswitch:"noarray", objectattribute:this.state.day,  switchV:true,miscswitch:true, day:true, objkey:"hwtime",  sp:20, realobject:{hwtime:times}, backendearr:["starpoints", "hwtime", "daysPracticed", "daystreak"]})
        }
    }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
      }
    render() {
        return (
            <View >

                        <Text className="centerized" style={{ alignSelf: "flex-start", marginBottom: 15}} >Log Time</Text>
                        <View>
                                        <Text>For which day are you submitting?</Text>
                                    <View className="form-group" >
                                    <SelectDropdown
                                        data={this.state.days}
                                        onSelect={(selectedItem, index) => {
                                            let days={
                                                monday:"mon", tuesday:"tue", wednesday:"wed", thursday:"thur",friday:"fri", saturday:"sat",sunday:"sun"
                                            }
                                            this.setday(days[selectedItem])
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                        />
                                       
                                    </View>
                                    
                                     <Text>How much time would you like to submit today?</Text>
                                    <View className="form-group" style={{ display: "flex", flexDirection: "row", marginBottom: 17 }}  >
                                    <View>
                                    <TextInput
                                    onChangeText={time => this.setState({time:time})}
                                    name="time"
                                    value={this.state.time}
                                    keyboardType="numeric"/>
                                    </View>
                                    </View>
                                    <View>
                                    <TouchableOpacity  onPress={this.handletime}  style={{ width:80, height:30, borderRadius:4,  justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5"}}><Text style={{color:"white"}}>Log Time</Text></TouchableOpacity>

                                    </View>
                                </View>

                </View>
        )
    }
}

