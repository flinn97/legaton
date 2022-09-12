import starpointService from "./starpointService";
import authService from "./auth.service";
class studentSevice {
    /**
     * King function for the application
     * @param {*} obj 
     * myswitch, switchV miscswitch realobject objkey objectattribute , backend, popup, tick
     */
    async middlewareDispatch(state, obj){
        //set up preliminary info
        let tobackend={};
        let todispatch={addhwtime: false, addtime:false, addhwtimeeditnote: false, addnote:false,  addhomework:obj.popupswitch?true:false, updatecircle: true,goals:false,showgoal:false,title:"", description:"", currentstudent:obj.switchV?  await authService.getCurrentUser(state.currentstudent): state.currentstudent};
        let j= obj.isobject? this.compare( todispatch.currentstudent[obj.objkey],  obj.realobject[obj.objkey]): undefined;
        let notvalidated=false;
        if(obj.switchV){
            console.log(obj.realobject);
            console.log(todispatch.currentstudent[obj.objkey][obj.objectattribute])
            console.log(obj.realobject[obj.objkey][obj.objectattribute])
            notvalidated =  !j? todispatch.currentstudent[obj.objkey][obj.objectattribute] === obj.realobject[obj.objkey][obj.objectattribute]:todispatch.currentstudent[obj.objkey][j][obj.objectattribute] === obj.realobject[obj.objkey][obj.objectattribute];
            console.log(notvalidated)
        }
        if(!notvalidated){
        //add update or delete miscswitch on the switch and whatever object it is with its updated contents. (goal.complete, maingoal.complete, syncchecboxes, hwsynccheckboxes, time, hwtime.)
        //pattern 2 update student solve for edge cases. also happens to be part of the verify process. could combine the line below this one with the third addupdatedelete down but I'm keeping it to show the reusability
        todispatch.currentstudent = obj.switchV? await this.addUpdateDelete({dataobject: todispatch.currentstudent, objs: todispatch.currentstudent, updateobj:{daysPracticed:obj.day? (parseInt(todispatch.currentstudent.daysPracticed)+obj.tick).toString() : (parseInt(todispatch.currentstudent.daysPracticed)-obj.tick).toString(),daystreak: obj.day? (parseInt(todispatch.currentstudent.daystreak)+obj.tick).toString() : (parseInt(todispatch.currentstudent.daystreak)-obj.tick).toString() ,starpoints:obj.miscswitch? starpointService.calcstarpoints(parseInt(todispatch.currentstudent.starpoints), parseInt(todispatch.currentstudent.daystreak), obj.sp):todispatch.currentstudent.starpoints}, myswitch:"noarray"}): todispatch.currentstudent;
        //patter 3 update state stuff in general with edge cases.
        todispatch = obj.switchV? await this.addUpdateDelete({dataobject: todispatch,objs: todispatch, updateobj:{level:obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).level: state.level,spgoal: obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).spgoal:state.spgoal,spamount:obj.miscswitch? starpointService.getstarpointgoalandlevel(parseInt(todispatch.currentstudent.starpoints)).spamount: state.spamount}, myswitch:"noarray"}): todispatch;
        todispatch.currentstudent = await this.addUpdateDelete({dataobject: todispatch.currentstudent, objs: obj.myswitch==="noarray"? todispatch.currentstudent: todispatch.currentstudent[obj.objkey], updateobj:obj.realobject, myswitch:obj.myswitch, addsplice: obj.addsplice})
        //pattern 4 update longterm memory, 
        console.log(obj.backendearr)
        // obj.backendearr.map((key)=>({tobackend[key]:todispatch.currentstudent[key]}));
        for(let x=0; x< obj.backendearr.length;x++){
            tobackend[obj.backendearr[x]]=todispatch.currentstudent[obj.backendearr[x]]
        }
        todispatch.currentuser= todispatch.currentstudent
    }
        return({todispatch:todispatch, tobackend:tobackend})
    }
    /**
     * 
     * @param {*} obj 
     * @returns an obdated copy of any object passed to it.
     * factory. Pass in A: data object to be updated, B: The key to the data to be uploaded. C: the thing to upload with. D: Some misc stuff to do other actions.
     */
     addUpdateDelete(obj) {
        
        let dataobject= obj.dataobject
        let mainob = obj.updateobj;
        let objs= obj.objs;
        let spliceadd = dataobject[obj.addsplice];
        for(const key in mainob){
        let i= obj.myswitch !=="noarray" && obj.myswitch !=="add"? this.compare(obj.addsplice? spliceadd:objs, mainob[key]): 0;
            switch(obj.myswitch){
                case "add":
                    objs.push(mainob[key]);
                    break;
                case "del":
                    objs.splice(i, 1);
                    break;
                case "update":
                    objs[i]= mainob[key];
                    break;
                case "noarray":
                    dataobject[key]= mainob[key];
                    break;
                case "splice":
                    objs.push(mainob[key]);
                    spliceadd.splice(i, 1);
                    dataobject[obj.addsplice]= spliceadd;
                    break;
            }
        }
        if(obj.myswitch!=="noarray"){dataobject[Object.keys(obj.updateobj)[0]]= objs}
        return  dataobject;
        }
    /**
     * 
     * @param {*} compare 
     * @param {*} compare1 
     * @param {*} condition 
     * @returns i for the compaired two values
     */
     compare(compare, compare1, ){
        let value;
        for(let i=0; i<compare.length; i++){
                if(compare[i]?._id?.toString()=== compare1?._id?.toString() ){
                value= i
                break;
                }  
                else if(compare1?.title&& (compare1?.title=== compare[i]?.title && compare1?.date?.toString()=== compare[i]?.date?.toString())){
                    value= i
                break;
                }
            else{
                value= false
            }
        }
        return value
    }
    /**
     * 
     * @param {*} state 
     * @param {*} obj 
     * @returns 
     */
    async verify(state, obj,){
        user=obj.switchV?  await authService.getCurrentUser(): state.currentstudent;
         return user;
    }
}
export default new studentSevice();