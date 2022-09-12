import axios from 'redaxios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// const API_URL = "https://legato.flinnapps.com/api/auth/";
const API_URL = "https://legato.flinnapps.com/legato/";
// const API_URL = "http://localhost:8080/legato/";
//be sure to upload axios. This is my controller for everything that I do for the backend.
class AuthService {
    login(email, password, loggedin) {
        //login with email and password. set jwt sign in localStorage. ignin
        return axios
            .post(API_URL + "signin", {
                email,
                password,
                loggedin
            }, )
            .then(response => {
                // console.log(response.data);

                if(!response.data[1]){
                    return response.data[0];
                }
                else {
                    let obj = response.data[0]
                    return response.data[0];
                }
            }).catch(err =>{
                return {};
            });
    }
    async getCurrentUser(myuser) {
            let user =  await this.login(myuser._id, false, true)
            return user
    }
    logout() {
        //delete jwt sign.
        localStorage.removeItem("user");
        window.location.reload()
    }
    async register(firstname, lastname, email, password) {
        //Teacher login. Name email password. Probably going to separate to first name and last name.
        return await axios.post(API_URL + "signup", {
            firstname,
            lastname,
            email,
            password
        }).then(response => {
            return response.data;
        });
    }
    getAllusers() {
        return axios.get(API_URL + "getAllusers", {
        }).then(response => {
            console.log(response.data)
            return response.data;
        });
    }
    addStudent(user, first, last, time,  day,) {
        let aschedule = "";
        for (let i = 0; i < time.length; i++) {
            if (time[i] !== ":") {
                if (i === 0 && time[i] !== "0") {
                    aschedule = aschedule + time[i];
                }
                else if (i > 0) {
                    aschedule = aschedule + time[i];
                }
            }
        }
        return axios.post(API_URL + "addstudent", {user, first, last, aschedule,  day,}).then(response => {
        return response.data;
    });
}
    /**
     * 
     * @param {*} role 
     * @param {*} id 
     * @param {*} changeData 
     * @returns change any data I want.
     */
    changeData(role, id, userid, changeData){
        console.log(changeData);
        let requestoptions={
            
        }
        return axios.post(API_URL + "changeData", {
            role, id, userid, changeData
        })
    }
    setPastFirstTime(id, studentid, password) {
        console.log(studentid);
        //for first time students changing password.
        return axios.post(API_URL + "past", {
            id,
            studentid,
            password,
        });
    }
    deleteStudent(student, email) {
        console.log(student);
        return axios
            .post(API_URL + "deleteStudent", {
                student, email,
            })
    }
    uploadPhoto(photo, id, background, role) {
        console.log(background);
        return axios.post('https://legato.flinnapps.com/api/auth/postpic',  photo ).then(response => {
        //return axios.post('http://localhost:8080/api/auth/postpic', photo, )
           // .then(response => {
            console.log(response.data);
            const picpath = response.data.path;
                        return axios.post("https://legato.flinnapps.com/api/auth/profilepic", {

           // return axios.post("http://localhost:8080/api/auth/profilepic", {
                picpath,
                id,
                background,
                role
            }).then(response => {
                console.log(response.data)
            })
        })
        }
}
export default new AuthService();