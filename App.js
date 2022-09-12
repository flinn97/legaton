import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//uploade above stuff from npm.
import "./App.css";
import Dispatch from './dispatch';
import styleService from './services/styleService';
import authService from './services/auth.service';
import Factory from './model/stateFactory.js';
import ComponentListInterface from './npm/componentListInterface';
import StudentRegister from './view/studentRegister';
import "./view/components/checkbox.css";
//nav bar helps to navigate from page to page with authorizations to login or sign up etc. 
class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.dispatch=this.dispatch.bind(this);
        // this.operate=this.operate.bind(this);
        this.factory= new Factory();
        this.state = {
            styles: styleService.getstyles(),
            factory: this.factory,
            componentListInterface:new ComponentListInterface(this.dispatch),
            componentList:undefined,
            backend: undefined,
            backendUpdate:undefined,
            toOpp:undefined,
            studentsToChatWith: [],
            switch:this.factory.getStateObject("switch").getJson(),
            ...this.factory.getStateObject("toState").getJson(),
            
        };
    }


    onSyncDispatch(obj){

        this.dispatch(obj);
    }
    async componentDidMount(){
        

        
        let myUser = await authService.getCurrentUser();
        if(myUser){
            myUser = JSON.parse(myUser);
            
            await this.setState({
                email: myUser.student? myUser.teacher: myUser.email
            })
        }
       let list;
        if(this.state.componentList===undefined && this.state.componentListInterface!==undefined){
            
            list = await this.state.componentListInterface.createComponentList();
            await this.setState({
                componentList:list,
            })
        }
        if(myUser){
            if(myUser.student){

                await authService.getAllTheDataForTheUser( myUser.email, list, myUser.student, myUser.teacher, this.dispatch );
                
            }
            else{
                await authService.getAllTheDataForTheUser(myUser.email, list, undefined, undefined, this.dispatch);
            }
            
            let student= myUser.student
            myUser= await this.state.componentList.getComponent(myUser.student? 'student':'user');
            
            this.setState({currentuser:myUser, myswitch: student? "studentDash":"dash", currentstudent:myUser, checkURL:true, });
            
        }
        
    }

    async componentDidUpdate(){
        if(this.state.firstTime){
            debugger
            let list = this.state.componentList.getList("student");
            for(const key in list){
                if (!list[key].getJson().firstTime){
                    this.setState({firstTime:false})
                }
            }
        }
        if(this.state.getChatroom){
            await this.setState({getChatroom:false})
            authService.getGeneralChatroom( this.state.currentuser.getJson().collection, this.state.componentList)
        }
        if(this.state.checkURL){
            //debugger
            
            await this.setState({checkURL:false})
            const ref = window.location.href;
            let splitref= ref.split("/");
            if(splitref.includes("legato")){
                if(splitref[4]==="calendar"){
                    this.setState({ myswitch: "calendar"});

                }
                let studentID= splitref[4];
                let stud = this.state.componentList.getComponent("student", studentID, "_id");
                if(stud){
                    this.setState({currentstudent:stud, myswitch: "viewstudent"});

                }

            }
        }
        
        if(this.state.getOtherStudents){
            await this.setState({getOtherStudents:false});
            
            await authService.getOtherStudents(this.state.currentstudent.getJson().syncedStudents, this.state.email, this.state.componentList, this.state.currentstudent.getJson()._id);
            await this.setState({getOtherStudents:false});
        }
        // if(window.innerWidth<1000){
        //     this.setState({
        //         styles: styleService.resize1()
        //     })
            
        // }
        if(this.state.backend!==undefined){
            ////debugger
            await this.setState({backend: undefined, updateCircle:true});
            authService.dispatch(this.state.backendUpdate, this.state.email);  
        }
        if(this.state.addStarpoints!==undefined ||this.state.subStarpoints!==undefined){
            
            if(this.state.spRun){
                this.setState({spRun: false})
                ////debugger
                let starpoints = await this.state.componentList.getList("starpoints", this.state.spid);
                ////debugger
                let levelUp = this.state.addStarpoints!==undefined? await starpoints[0].calcSP(this.state.addStarpoints) : await starpoints[0].calcDownSP(this.state.subStarpoints);
            }
        }
        if(this.state.operate!==undefined ||this.state.operation==="run"){
            let operation = this.state.operation;
            let operate= this.state.operate;
            let object = this.state.object;
            await this.setState({operate:undefined, operation:"cleanJsonPrepare", object:undefined, currentComponent:undefined});
            let operationsFactory =this.state.componentList.getOperationsFactory();
            let splice = operate!==undefined? await operationsFactory.getSplice(operate) : "";
            
            let obj = await operationsFactory.operationsFactoryListener({operate:operate, operation:operation, object:object});
            
            let currentComponent=operate!==undefined? obj[splice][0]: undefined;
            await this.setState({currentComponent: currentComponent});
        }
    }

    async dispatch(obj){
        if(this.state.keepChat){
            obj.myswitch='chat'
        }
        await this.setState(obj)
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

render() {
        return (
            <View>
            {this.state.start?(<Nav state={this.state} handleChange={this.handleChange} dispatch={this.dispatch}/>):(<></>)}
               </View> 
            
        )
    }
} 
export default App;
