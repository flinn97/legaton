import React, { Component } from "react";
// import "./progress_circle.css";
import { Button, Text, View, Image, SafeAreaView, StyleSheet, TextInput, } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
  } from 'react-native-reanimated';
  import CircularProgress from 'react-native-circular-progress-indicator';

//not much here but functionality will be added for the goals.
export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            // stylel: "rotate(180deg)",
            // styler: "rotate(180deg)",
            completedGoals: 0,
            incompletGoals: 0,
            totalGoals: 0,
            percent: 0,
            goals: this.props.props.props.props.props.state.goals? this.props.props.props.props.props.state.goals: {}

        };
    }
    componentDidMount() {
        console.log("circle", this.state.goals)
        var totalgoals= this.state.goals.length
        for (let i=0; i<this.state.goals.length; i++){
            let goalz= this.state.goals[i]
            for(let i=0; i<goalz.mainGoal.goals.length; i++){
                
                totalgoals++
            }
        }

        if(this.props.main){
            this.setState({
                totalGoals: totalgoals
            })
        }
        else{
            this.setState({
                totalGoals: totalgoals
            })
        }
   
        this.progressCalc();

       
        
            
        
    }
    async progressCalc() {

        let completedGoals = 0;
        let goals = 0;

        for (let i = 0; i < this.state.goals.length; i++) {

            if (this.state.goals[i].mainGoal.complete) {
                completedGoals += 1;
            }
            else {
                goals += 1;
            }
            let goalz= this.state.goals[i]
            for(let i=0; i<goalz.mainGoal.goals.length; i++){
                if(goalz.mainGoal.goals[i]){
                if(goalz.mainGoal.goals[i].complete){
                    completedGoals += 1;
                }
                else {
                    goals += 1;
                }
            }
            }
        }
        if (this.props.main) {
            if (this.props.main.complete) {
                completedGoals += 1;
            }
        }
        
        await this.setState({
            completedGoals: completedGoals,
            incompletGoals: goals,
        })
        
        console.log(this.state.totalGoals);
        let calc = 100 / this.state.totalGoals;
        let percentage = calc * this.state.completedGoals;
        // let calculate = 360 / this.state.totalGoals;
        // let calculated = calculate * this.state.completedGoals;
        // let overcalc =0;
        

        // if (calculated > 180) {
        //     overcalc = calculated - 180;
        //     calculated = 180;

        // } 
        // console.log(calculated);

        // console.log(overcalc);
        // const stylel = "rotate(" + calculated.toString() + "deg)";
        // const styler = "rotate(" + overcalc.toString() + "deg)";

        
        let percent = percentage.toString();
        let perc = "";
        if (percent.length > 4) {

            for (let i = 0; i < 4; i++) {
                perc += percent[i];
            }
        }
        else {
            perc = percent;
        }

        this.setState({
            percent: parseInt(perc),
            // stylel: stylel,
            // styler: styler,

        });

        // if(!this.props.main){
        //     if(this.props.goals.length===0){
        //         this.setState({
        //             percent: "0",
        //             stylel: "rotate(" + "0" + "deg)",
        //             styler: "rotate(" + "0" + "deg)"

        //         })
        //     }
        // }
    
    }
    /*
     
     */
    render() {
        return (
            
            <View >
                    <CircularProgress
  value={this.state.percent}
  valueSuffix={'%'}
  radius={115}
  activeStrokeWidth={24}
  inActiveStrokeWidth={24}
  duration={2000}
  textColor={'#696eb5'}
  activeStrokeColor={'#696eb5'}
  inActiveStrokeColor={'#C8CAE4'}
  maxValue={100}
  titleColor={'white'}
  titleStyle={{fontWeight: 'bold'}}
/>
                {/* {this.props.profile ? (
                    <div>
                        {this.props.userProfile?(
                        
                        <div  >
                            {this.state.percent==="0"?(<div>
                                <div className="circlesI">
                            <div className="inner">
                                <img
                                    src={this.props.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circleI">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>




                            </div>):(<div>

                                <div className="circles5">
                            <div className="inner">
                                <img
                                    src={this.props.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circle5">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>
                            </div>)}
                            
                        


                        </div>):(<div>

                            {this.state.percent==="0"?(<div className="circlesIa">
                            <div className="inner">
                                <img
                                    src={this.props.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circleIa">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>):(<div className="circles4">
                            <div className="inner">
                                <img
                                    src={this.props.pic}
                                    alt="profile-img"
                                    className="profile-img-carda  cropped1 "

                                />
                            </div>
                           
                                

                            
                           
                        
                            <div className="circle4">
                            <div className="bar left">
                                <div className="progress" style={{ transform: this.state.stylel }}></div>
                            </div>
                            <div className="bar right">
                                <div className="progress" style={{ transform: this.state.styler }}></div>
                            </div>
                        </div>
                        
                        
                    </div>)}
                            
                        <div className="number2" style={{marginTop:"25px"}}>{this.state.percent}% Towards Goal</div>
                            
                        </div>)}
                        
                    </div>

                ) : (<div>
                    {this.state.percent==="0"?(

                        <div className="circlesI3 ">
                            <div className="inner "></div><div className=" innera"></div>
                    <div className="number">{this.state.percent}%</div>
                            <div className="circleI3">
                                <div className="bar left">
                                    <div className="progress" style={{ transform: this.state.stylel }}></div>
                                </div>
                                <div className="bar right">
                                    <div className="progress" style={{ transform: this.state.styler }}></div>
                                </div>
                            </div>
                        </div>
                    ):( */}

                        {/* <View style={styles.circles3}>
                            <View  style={styles.inner} ></View>
                            {/* <View  style={styles.inner} className=" innera"></View> */}
                    {/* <View  style={styles.number} ><Text>{this.state.percent}%</Text></View>
                             <View className="circle3">
                                <View className="bar left">
                                    <View className="progress" style={{
                                        //  transform: this.state.stylel 
                                         }}></View>
                                </View>
                                <View className="bar right">
                                    <View className="progress" style={{
                                        //  transform: this.state.styler
                                          }}></View>
                                </View>
                            </View> 
                        </View> */}
                     {/* )} */}
                        

                    {/* </div>
                     )} */}
            
                
            </View>
        );

    }
}

const styles = StyleSheet.create({
    circles3: {
        height: 100,
        width: 100,
        backgroundColor: "#C8CAE4",
        borderRadius: 100,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
        // position:"absolute",
    },
    inner: {
        position: "absolute",
        zIndex: 5,

        height: 80,
        width: 80,
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "white",
        borderRadius: 100,
    },
    

    number: {
        position: "absolute",
        
        // transform: "translate(-50%, -50%)",
        zIndex: 10,
        fontSize: 18,
        // fontWeight: 500,
        color: "#696eb5",
        backgroundColor: "white",
    },

    bar: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor:"#C8CAE4",
    borderRadius: 100,
    // clip: rect(0px, 100px, 100px, 50px);
},

bar: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 100,
    // clip: rect(0px, 50px, 100px, 0px);
    backgroundColor: "#696eb5"
},

left:{
    zIndex: 1,
    // animation: left 1s linear both;
},
right: {
    // transform: rotate(180deg);
    zIndex: 2
},

  progress: {
        // animation: right 1s linear both;
        // animation-delay: 1s;
    }



  });
/*
 
 */