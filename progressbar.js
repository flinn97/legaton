import React, { Component, useEffect, useState, useRef } from "react";
import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput, } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
  } from 'react-native-reanimated';
  import CircularProgress from 'react-native-circular-progress-indicator';
  import Constants from 'expo-constants';


// import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native';

//not much here but functionality will be added for the goals.
export default class Progress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: this.props.totalDays,
            timeprogress: this.props.totaltime,
            starpoints: this.props.starpoints,
            starpointsProg: this.props.spGoal,
            time: this.props.timePracticed,
            text: "Starpoints",
            style: 0,
            daysPracticed: 0,
            height: "40px"
        };
    }
    async componentDidMount() {
        if (this.props.text==="Days Practiced ") {
            await this.setState({
                daysPracticed: this.props.starpoints
            })
        }
        
        
        if (this.props.text==="Days Practiced " ) {
            await this.setState({ progress: this.props.spGoal })
        }
        if(this.props.text==="Days Practiced "){
            let percent = 100 / parseInt(this.state.progress);
        let calc = percent * parseInt(this.state.daysPracticed);
        if (calc === 0) {
            this.setState({
                style: 0,
                height: 0,
            })
        }
        else {
            if(parseInt(calc) >100){
                calc=100
            }
            this.setState({
                style: calc.toString() + "%",
                height: 40
            })
        }
        }
        else if(this.props.text==="Time Practiced "){
            await this.setState({
                timeprogress:this.props.spGoal,
                time: this.props.starpoints,
            })
            let percent = 100 / parseInt(this.state.timeprogress);
        let calc = percent * this.state.time;
        if (calc === 0) {
            this.setState({
                style: 0,
                height: 0,
            })
        }
        else {
            if(parseInt(calc) >100){
                calc=100;
                console.log("calc", calc);
            }
            console.log("calc", calc);
            this.setState({
                style: calc.toString() + "%",
                height: 40
            })
        }
        }
        else{
            let percent = 100 / this.state.starpointsProg;
        let calc = percent * this.state.starpoints;
        if (calc === 0) {
            this.setState({
                style: 0,
                height: 0,
            })
        }
        else {
            if(parseInt(calc) >100){
                calc=100;
            }
            this.setState({
                style: calc.toString() + "%",
                height: 40
            })
        }
        }
        
        
        
        
     }
  
    render() {
        return (
            <View >
                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
           <Text>{this.props.text}</Text> 
           <Text>{this.props.starpoints}/{this.props.spGoal}</Text>
           </View>
   <View style={styles.progressBar}>
       
   <Animated.View style={{...styles.progress, width: this.state.style}} />
   </View>
</View>
            
//             <div className= "centerized" style={{ width: "100%" }}>
//                 {this.props.day ?
//                     (
//                         <div style={{ width: "270px" }}>{
//                             this.props.totalDays === 0  ? (

//                                 <div>{this.props.role === "student" ? (<div>No Days Set by Teacher</div>) : (<div style={{ width: "270px" }}><button style={{ width: "270px" }} className="btn btn-primary btn-block" value="submit" >Practice days set. </button></div>
// )}
//                                     </div>

//                             ) :
//                                 (
//                                     <div>
//                                         {this.props.totalDays ? (
//                                             <div>{this.props.role === "student" ?
//                                                 (
//                                                     <div style={{ marginTop: "25px" }}>

//                                                         <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Days Practiced:</b></div><div>{this.state.daysPracticed} / {this.props.totalDays}</div></div>

//                                                         {this.state.height === "0px" ? (
//                                                             <div style={{ width: "270px", height: "18px" }} class="progress-bar1"></div>
//                                                         )
//                                                             :
//                                                             (
//                                                                 <div style={{ width: "270px", height: "18px" }} class="progress-bar ">
//                                                             <div style={{ width: this.state.style, height: "18px"}}></div>
//                                                                 </div>
//                                                             )
//                                                         }
                                                        

//                                                     </div>
                                                    
//                                                 ) 
//                                                         : 
//                                                         (
//                                                     <div style={{ marginTop: "15px" }}>
//                                                         <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Days Practiced:</b></div><div>{this.state.daysPracticed} / {this.props.totalDays}</div> </div>

//                                                         {this.state.height === "0px" ? (

//                                                             <div style={{ width: "270px", height: "18px" }}  class="progress-bar1 "></div>
//                                                         ) : (
//                                                                 <div style={{ width: "270px", height: "18px" }}  class="progress-bar ">
//                                                                     <div style={{ width: this.state.style, height: "18px" }}></div>
//                                                                 </div>
//                                                             )}
                                                        
                                                        
//                                                         </div>
//                                                 )}
//                                     </div>

                                            
//                                         ) : (<div style={{ width: "270px" }}></div>)}
//                                     </div>

//                                 )}
//                         </div>

//                     )
//                     : (
//                     <div>
//                             {this.props.time ? (<div>
//                                 <div style={{  height: "20px" }}>{this.props.role === "student" ?
//                                     (
//                                         <div>
//                                             <div style={{ marginLeft: "5px", marginTop: "10px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Time Practiced:</b></div><div>{this.props.timePracticed} m / {this.props.totaltime} m</div> </div>


//                                             {this.state.height === "0px" ? (<div style={{ width: "270px", height: "18px" }}  class="progress-bar1"></div>) : (<div style={{ width: "270px", height: "18px" }}  class="progress-bar ">



//                                                 <div style={{ width: this.state.style, height: this.state.height }}></div>



//                                             </div>)}

//                                         </div>
//                                     ) : (
//                                         <div style={{ marginTop: "15px", }}>
//                                             <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Time Practiced:</b></div><div>{this.props.timePracticed} m / {this.props.totaltime} m</div> </div>


//                                             {this.state.height === "0px" ? (<div style={{ width: "270px", height: "18px" }}  class="progress-bar1 "></div>) : (<div style={{ width: "270px", height: "18px" }}  class="progress-bar ">



//                                                 <div style={{ width: this.state.style, height: this.state.height }}></div>



//                                             </div>)}

//                                         </div>
//                                     )}
//                                 </div>

//                             </div>) : (
//                                     <div>{this.props.role === "student" ?
//                                     (
//                                             <div style={{ marginTop: "10px", height: "25px",  }}>
//                                                 <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Star Points:</b></div><div>{this.props.starpoints} / {this.props.spGoal}</div></div>
//                                                 {this.state.height === "0px" ? (<div style={{ width: "270px", height: "18px" }} class="progress-bar1"></div>)
//                                                     :
//                                                     (
//                                                         <div style={{ width: "270px", height: "18px" }} class="progress-bar ">
//                                                             <div style={{ width: this.state.style, height: this.state.height }}></div>
//                                                         </div>
//                                                     )
//                                                 }



//                                         </div>
//                                     ) : (
//                                             <div style={{ marginTop: "15px", height: "25px", marginBottom: "20px" }}>
//                                                 <div style={{ marginLeft: "5px", marginBottom: "0px", justifyContent: "space-between", flexDirection: "row", display: "flex", width: "260px" }} ><div><b>Star Points:</b></div><div> {this.props.starpoints} / {this.props.spGoal}</div> </div>


//                                                 {this.state.height === "0px" ? (<div style={{ width: "270px", height: "18px" }}  class="progress-bar1 "></div>) : (<div style={{ width: "270px", height: "18px" }}  class="progress-bar ">



//                                                 <div style={{ width: this.state.style, height: this.state.height }}></div>



//                                             </div>)}

//                                         </div>
//                                     )}
//                                 </div>

//                             )
                        
//                         }</div>
                        
//                         )}
                
//             </div>
        );

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
      progress:{
        ...StyleSheet.absoluteFill, backgroundColor: "#696eb5", borderRadius: 20
      }


  });

 