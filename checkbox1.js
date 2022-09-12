import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'react-native-custom-checkbox';
export default class Check extends Component {
    constructor(props) {
        super(props);
        this.handlechange = this.handlechange.bind(this);
        this.state = {
            checkboxValue: this.props.goal.complete,
            maincheck:false,
            //checkboxValue1: this.props.flag,
            checkboxValue1: this.props.goal.complete,

            practice: 0,
            p: false,
            
        }
}

componentDidMount(){
    if(this.props.main){
        this.setState({
            maincheck: this.props.goal.mainGoal.complete,
            checkboxValue1: this.props.goal.mainGoal.complete
        })
    }

}

// async markcheckbox(goal) {
//     console.log(this.state.checkboxValue1, goal, this.props.main)
//     await this.setState({
//         checkboxValue1: !this.state.checkboxValue1,
//         maincheck: !this.state.maincheck,
//         checkboxValue: !this.state.checkboxValue,
//     })
    
//     this.props.goalStatusChange(this.state.checkboxValue1, goal, this.props.main );
    
    

// }
async handlechange(goal){
        // console.log(this.state)
        this.setState({
            p:!this.state.p
        })
        await this.setState({
            checkboxValue1: !this.state.checkboxValue1,
            maincheck: !this.state.maincheck,
            checkboxValue: !this.state.checkboxValue,
        })
        
        this.props.completeGoal(this.state.checkboxValue1, goal, this.props.main );
    }
    

    render() {
        return (
            <View  >
                <View>
                    <View   style={{display:"flex", alignItems:"center", }}>
                        <Checkbox checked={this.state.p}  size={this.props.size} style={{backgroundColor: '#f2f2f2', color:'#7A9B76', borderRadius: 5}} onChange={this.handlechange.bind(this, this.props.goal) }/>
                            <View  style={{position:"absolute"}}>
                                <View >
                                            <View style={styles.csyncbox}>                              
                                                <View style={{display:"flex", alignItems:"center",fontSize:30 }} >
                                                {/* <TouchableWithoutFeedback onPress={this.handlechange}>
                                                </TouchableWithoutFeedback> */}
                                                </View>
                                            </View>                                        
                                </View>
                            </View>
                            </View>
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
