import React, { Component } from 'react';
import Checkbox from 'react-native-custom-checkbox';
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import Mycheck from './check';
// import "./checkbox.css"
class Checkedd extends Component {
    constructor(props) {
        super(props);
        this.markcheckbox = this.markcheckbox.bind(this);
        this.state = {
                checked: { ...this.props.checked },
                style: styleService.getCustomCheckbox(true),
                time: {...this.props.component.getJson().time}
        }

}
componentDidUpdate(props, state) {
        if ((this.props.component?.getJson()?.checked !== state.checked)) {
                this.setState({ checked: this.props.component?.getJson()?.checked })
        }
}
componentDidMount(){
        let style = styleService.getCustomCheckbox(this.props.big);
        this.setState({style: style});
}

/**
 * 
 * @param {*} e 
 * @param {*} day 
 * check the box send to backend.
 */
async markcheckbox(day) {
        //
        let comp = this.props.component
        let component = this.props.component.getJson();
        let checked = { ...this.state.checked }
        checked[day] = !checked[day];
        await this.setState({ checked: checked });
        await this.props.component.checked(day);
        let sp = checked[day] ? { addStarpoints: component.type } : { subStarpoints: component.type };
        this.props.dispatch({ ...sp, spRun: true, spid: component.type==="student"? component._id: component.owner });
        //

                if (component.time &&component.type === "student" &&checked[day]) {
                        this.props.app.dispatch({ popupSwitch: "addTime", currentComponent: this.props.component, forTime: day })
                }
        
}

    render() {
        return (

            <View style={{display:"flex", flexDirection:"row", }}>
               
                    <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.mon} day="mon"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.mon} text="M"/>
                        <View>{this.state.time?.mon} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.tues} day="tues"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.tues} text="T"/>
                    <View>{this.state.time?.tues} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.wed} day="wed"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.wed} text="W"/>
                    <View>{this.state.time?.wed} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.thurs} day="thurs"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.thurs} text="Th"/>
                    <View>{this.state.time?.thurs} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.fri} day="fri"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.fri} text="F"/>
                    <View>{this.state.time?.fri} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.sat} day="sat"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.sat} text="S"/>
                    <View>{this.state.time?.sat} m</View>
                        </View>
                        <View style={{display: "flex", flexDirection:"column"}}>
                    <Mycheck size={this.props.size} checked={this.state.syncedCheckboxes?.sun} day="sun"  markcheckbox={this.markcheckbox} time={this.props.student?.hwtime?.sun} text="Su"/>
                    <View>{this.state.time?.sun} m</View>
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

export default Checkedd;