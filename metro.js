import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, StyleSheet, TextInput ,ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Audio } from 'expo-av';
// import Button from '../components/button.js';
// import Slider from '../components/slider.js';
// import './pages.css';
import Metro from "./metronome.png"
import image from "./metronome.png"
import click from "./click1.wav"
import Slider from '@react-native-community/slider';

export default class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: 100,
            playing: false,
            count: 0,
            tooSmall: false,
            marginTop: "200px",
            margint: "",
            screensize: "",
            maxHeight:"700px",
            splashscreen:true,
            click1: undefined,

        }
       
        // this.click2 = new Adio("./click1.wav");
        this.handleBPM = this.handleBPM.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
        this.startStop = this.startStop.bind(this);
        this.playClick = this.playClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.sound = new Audio.Sound();
        
    }
     async componentDidMount(){
        const sound = await this.sound.loadAsync(require('./click1.wav'));
        this.setState({click1:sound})
        }
     
    //  handlePress() {
    //     this.hello.play((success) => {
    //       if (!success) {
    //         console.log('Sound did not play')
    //       }
    //     })
    //   }
    


    updateInterval() {
        const bmpSpeed = 60 * 1000 / this.state.bpm;
        this.timer = setInterval(this.playClick, bmpSpeed);
    }

    handleBPM(event) {
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            this.updateInterval();
            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({
                bpm
            });
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target


        this.setState({
            [name]: value,
        })

        
        


    }

    async playClick() {
        
try {
  await this.state.click1.playAsync();
  // Your sound is playing!

  // Don't forget to unload the sound from memory
  // when you are done using the Sound object
  await this.sound.unloadAsync();
} catch (error) {
  // An error occurred!
}

        // if (this.state.count === 0) this.click2.play();
        // else 
        // const {click1} =  await Audio.Sound.createAsync(
        //     require('./click1.wav')
        //  );
        //  await this.setState({
        //      click1: click1
        //  })
        // await this.state.click1.playAsync();
        // this.setState({
        //     count: this.state.count + 1
        // });
    }

    startStop() {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            this.updateInterval();
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
    }

    render() {
        return (
            
<View style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center", width:"100%", flex: 1,}}> 
 <ImageBackground source={image}  style={styles.image}>
      <Text style={styles.text}>Metronome</Text>
      <SafeAreaView>
          <TextInput
          style={{width: 75, fontSize: 40, backgroundColor:"white", marginTop:100, justifyContent:"center", alignItems:"center"}}
          onChangeText={this.handleChanges}
          value={this.state.bpm.toString()}
          keyboardType="numeric"/>
                </SafeAreaView>
                <Slider
                    style={{width: 300, height: 60, marginTop: 100}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#696eb5"
                    maximumTrackTintColor="#C8CAE4"
                    thumbTintColor= "white"
                />
                <TouchableOpacity onPress={this.startStop} style={{marginTop:70, backgroundColor:"#696eb5", color:"white", width:70, justifyContent:"center", alignItems:"center",height:30, borderRadius: 4}}><Text style={{color:"white"}}>Start</Text></TouchableOpacity>
    </ImageBackground>
     </View>
                   
            
        )
    }
} 
const styles = StyleSheet.create({

    text: {
        color: "black",
        marginTop: 25,
        fontSize: 25,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        
      },
      image: {
        // flex: 1,
        alignItems: "center",
        
        height:500,
        width:380
        // width:"100%",
        // resizeMode: "cover"
        // width: '100%',


      },


  });