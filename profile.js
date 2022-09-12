import React, { Component } from "react";
// import AuthService from "./services/auth.service";
import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import avatar from "./avatar_2x.png";
import editImg from "./edit.png";

export default class Homework extends Component {
    //state creation and binding.
    constructor(props) {
        super(props);
        this.state = {
            picture: "avatar_2x.png",
            username: this.props.state.currentstudent.username,
            first: this.props.state.currentstudent.firstName,
            last: this.props.state.currentstudent.lastName,
            email:  this.props.state.currentstudent.email,
            phone: this.props.state.currentstudent.phone

        };
    }


    render() {
        //login page for the screen.
        return (
            <View style={styles.mainContainer}>
            <TouchableOpacity  onPress={this.props.middlewareDispatch.bind(this,{myswitch:"noarray",switchV:false, realobject:{firstName: this.state.first, lastName:this.state.last, username:this.state.username,   email:this.state.email, phone:this.state.phone, },  backendearr:["firstName", "lastName", "username","email","phone", ] })}  style={{ width:80, height:30, borderRadius:4,  justifyContent:"center", alignItems:"center", backgroundColor:"#696eb5"}}><Text style={{color:"white"}}>Save</Text></TouchableOpacity>
              <View style={styles.imgContainer}><Image source={avatar} style={styles.img}/></View>
               <SafeAreaView>
                <Text style={styles.label}>Username</Text>
                <TextInput
                style={styles.textInput1}
                onChangeText={username => this.setState({username:username})}
                value={this.state.username}
                />
                      </SafeAreaView>
                      <SafeAreaView>
                <Text style={styles.label}>First Name</Text>
                <View style={styles.txtImgContainer}>
                <TextInput
                style={styles.textInput1}
                onChangeText={first => this.setState({first:first})}
                value={this.state.first}
                />
                  <Image source={editImg}/>
                </View>
                      </SafeAreaView>
                      <SafeAreaView>
                <Text style={styles.label}>Last Name</Text>
                <View style={styles.txtImgContainer}>
                <TextInput
                style={styles.textInput1}
                onChangeText={last => this.setState({last:last})}
                value={this.state.last}
                />
                  <Image source={editImg}/>
                </View>
                      </SafeAreaView>
                      <SafeAreaView>
                <Text style={styles.label}>Email</Text>
                <View style={styles.txtImgContainer}>
                <TextInput
                style={styles.textInput1}
                onChangeText={email => this.setState({email:email})}
                value={this.state.email}
                />
                  <Image source={editImg}/>
                </View>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                style={styles.textInput1}
                onChangeText={phone => this.setState({phone:phone})}
                value={this.state.phone}
                />
              </SafeAreaView>
              <View style={styles.buttonContainer}>
                <Button color="#696EB5" title="Go To Teacher Page"/>
              </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 40,
    marginRight: 40
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  img: {
    borderRadius: 20
  },
  label: {
    width: 200,
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 10
  },
  textInput1: {
    fontSize: 18,
    backgroundColor:"white",
    borderRadius: 8,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10
  },
  textInput2: {
    flex: 5,
    marginRight: 10,
    fontSize: 18,
    backgroundColor:"white",
    borderRadius: 8,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10
  },
  txtImgContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
