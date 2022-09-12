import * as React from 'react';
import { Text, View,TouchableWithoutFeedback } from 'react-native';
import Homework from './homework.js';
import Goals from './goals.js';
import Metro from './metro.js';
import Progress from './progress.js';
import ProfileScreen from './profile.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons, MaterialCommunityIcons, Foundation  } from "@expo/vector-icons";
import Chat from './chat.js';
import studentService from './services/studentService.js';
import authService from './services/auth.service.js';
import Currenthw from './currenthw.js';
import Time from './time.js';

export default function Nav(props) {
  
  async function middlewareDispatch(obj){
    let middlewareDispatch = await studentService.middlewareDispatch(props.state, obj)
    props.dispatch(middlewareDispatch.todispatch)
    if(Object.keys(middlewareDispatch.tobackend).length>0){
    await authService.changeData("student", middlewareDispatch.todispatch.currentstudent._id, middlewareDispatch.todispatch.currentstudent.userID,  middlewareDispatch.tobackend,)
    }
}
  return (
    <View style={{width:'100%', height:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}} >
      <View style={{width:'100%', height:50, display:"flex", flexDirection:"row", position:"absolute", top:0,marginTop:30, justifyContent:"space-between" }} >
       <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "profileScreen"})}>
        <Text style={{position:"absolute",margin:10 , right: 0,   }}>P</Text>
       </TouchableWithoutFeedback>
      </View>
      <Switchcase middlewareDispatch={middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>
      <View style={{width:'100%', height:50, display:"flex", flexDirection:"row",  position:"absolute", bottom:0, justifyContent:"space-around" }} >
      <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "homework"})}>
        <Text style={{ }}>H</Text>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "goals"})}>
        <Text style={{ }}>G</Text>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "metro"})}>
        <Text style={{  }}>M</Text>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "chat"})}>
        <Text style={{  }}>C</Text>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback onPress={props.dispatch.bind(this,{myswitch: "progress"})}>
        <Text style={{  }}>P</Text>
       </TouchableWithoutFeedback>
      </View>
      </View>
  );
}
function Switchcase (props) {
    let mypage={
        homework: <Homework middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        goals: <Goals middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        metro: <Metro middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        chat: <Chat middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        // teacherpage: <Teacher middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        profileScreen: <ProfileScreen middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        progress: <Progress middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        currenthw: <Currenthw middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state}/>,
        time: <Time middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state} hwtime={props.state.currentstudent.hwtime} homework={false}/>,
        hwtime: <Time middlewareDispatch={props.middlewareDispatch} handleChange={props.handleChange} dispatch={props.dispatch} state={props.state} hwtime={props.state.homework?.timehw} homework={true}/>

    }
    return mypage[props.state.myswitch]? mypage[props.state.myswitch]: <div></div>;

  }