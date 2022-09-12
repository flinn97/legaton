import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'react-native-custom-checkbox';

class Checkedd2 extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {
            checked:this.props.goal?.getJson().complete,
        }
    }
    /**
     * 
     * @param {*} e 
     * @param {*} day 
     * check the box send to backend.
     */
     async markcheckbox() {
        //
        await this.setState({checked: !this.state.checked})
        let id = this.props.state.currentstudent.getJson()._id;
        debugger
        let sp = this.props.state.componentList.getComponent("starpoints", id);
        debugger
        let type = this.props.goal.getJson().mainID? "goal":"mainGoal";
                if(this.state.checked){
            sp.calcSP(type);
        }
        else{
            sp.calcDownSP(type);
        }
        
        this.props.goal.checked(starpointService.calcstarpoints, this.props.app.state.currentstudent);
    }

    render() {
        
        return (
            <Checkbox onChange={this.markcheckbox} style={{backgroundColor: '#f2f2f2', color:'#7A9B76', borderRadius: 5}} size={this.props.size} checked={this.state.checked} />
            )
}
}

export default Checkedd2;