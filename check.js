import React, { Component } from 'react';
import Checkbox from 'react-native-custom-checkbox';
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';

// import "./checkbox.css"
class Mycheck extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {  
        checked: this.props.checked? true: false
        }
    }
    async markcheckbox(){
        await this.setState({checked: !this.state.checked})
        this.props.markcheckbox(this.props.day);
    }

    render() {
        return (

               
                    <View style={{display: "flex", flexDirection:"column"}}>

                   <View>
                       <View>
                           <View style={{display:"flex", alignItems:"center" }}>
                                   <Checkbox checked={this.state.checked}  size={this.props.size} style={{backgroundColor: '#f2f2f2', color:'#7A9B76', borderRadius: 5}} />
                                       <View  style={{position:"absolute"}}>
                                           <View >
                                                <TouchableWithoutFeedback onPress={this.markcheckbox}>
                                                <Text style={{ position: "absolute",fontSize:30, marginTop:10 }}>{this.props.text}</Text>
                                                </TouchableWithoutFeedback>
                                           </View>
                                       </View>
                                    </View>
                                </View><Text>{this.props.time}</Text>
                            </View> 
                        
                        </View>
                       
            )
}
}
const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        backgroundColor: '#C8CAE4',
        // borderColor: '#000',
        // borderWidth: 2,
        borderRadius: 20
      },
      overlay:{
        ...StyleSheet.absoluteFill, 
      },
      csyncbox: {
        zIndex: 100,
        position: "relative",
        
    }

  });

export default Mycheck;