
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        // history.push('/chat');
                        firebase.database().ref('users/' + createdUser.uid + '/').once('value')
                            .then((userData) => {
                                let currentUser = userData.val();
                                console.log(currentUser)
                                if (currentUser.userType === 'com') {

                                    history.push('/Company');
                                }
                                else if (currentUser.userType === 'std') {

                                    history.push('/Student');
                                }
                                else if (currentUser.userType === 'admin') {

                                    history.push('/Admin');
                                }
                                // let allUsers = userData.val();
                                // let currentUserUid = firebase.auth().currentUser.uid;
                                // delete allUsers[currentUserUid];
                                // let allUsersArr = [];
                                // for (var key in allUsers) {
                                //     allUsersArr.push(allUsers[key]);
                                // }
                                // console.log(allUsersArr);
                                // dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                                // dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                // firebase.database().ref('message/').once('value')
                                //     .then((messagesData) => {
                                //         let messages = messagesData.val();
                                //         console.log(messages);
                                //         dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                //         history.push('/chat');
                                // })

                            })
                    })


            })



    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/' + signedinUser.uid + '/').on('value', snap => {
                    console.log(snap.val())
                    let userType = snap.val().userType
                    if (userType === 'std') {
                        history.push('/Student');
                    } else if (userType === 'com') {
                        history.push('/Company');
                    } else if (userType === 'admin') {
                        history.push('/Admin');
                    }
                });
                // history.push('/chat');
            })
    }
}
let messagesArr = [];
export function checkLogin() {
    return dispatch => {
        console.log('in check login')
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            // console.log(userId);
            let that = this;
            if (userId !== null) {
                console.log('user is logged in')
                firebase.database().ref('users/' + userId + '/').once('value')
                    .then((userData) => {
                        let currentUser = userData.val();
                        if (currentUser.userType === 'com') {

                            history.push('/Company');
                        }
                        else if (currentUser.userType === 'std') {

                            history.push('/Student');
                        }
                        else if (currentUser.userType === 'admin') {

                            history.push('/Admin');
                        }
                        // dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        // dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        // history.push('/chat');
                    })
                // dispatch({ type: ActionTypes.LOGIN, payload: true })
                // history.push('/chat');
            } else {
                console.log('no user is logged in');
                dispatch({ type: ActionTypes.LOGIN, payload: true })

            }
        })
    }
}
export function checkLoginAndFetchData() {
    return dispatch => {
        console.log('in check login')
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            // console.log(userId);
            let that = this;
            if (userId !== null) {
                console.log('user is logged in')
                firebase.database().ref('users/' + userId).once('value')
                    .then((userData) => {
                        let currentUser = userData.val();
                        // if (currentUser.userType === 'com') {

                        //     history.push('/Company');
                        // }
                        // else if (currentUser.userType === 'std') {

                        //     history.push('/Student');
                        // }
                        // else if (currentUser.userType === 'admin') {

                        //     history.push('/Admin');
                        // }
                        dispatch({ type: ActionTypes.LOGIN, payload: true })
                        // dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        // history.push('/chat');
                    })
                // dispatch({ type: ActionTypes.LOGIN, payload: true })
                // history.push('/chat');
            } else {
                console.log('no user is logged in');
                // dispatch({ type: ActionTypes.LOGIN, payload: false })
                history.push('/');

            }
        })
    }
}

export function signOut() {
    return dispatch => {
        // dispatch({ type: ActionTypes.CHANGERECPUID, payload: recpUID })

        firebase.auth().signOut().then(function () {
            console.log("Logout")
            // localStorage.clear();
            // localStorage.setItem('activeUser', 'offline')
        }).catch(function (err) {
            console.log(err.message);
        })
        history.push('/')

    }
}
export function postJob(job) {
    return dispatch => {
        // dispatch({ type: ActionTypes.CHANGERECPUID, payload: recpUID })

        // firebase.auth().signOut().then(function () {
        //     console.log("Logout")
        //     // localStorage.clear();
        //     // localStorage.setItem('activeUser', 'offline')
        // }).catch(function (err) {
        //     console.log(err.message);
        // })
        // history.push('/')
        firebase.database().ref('jobs').push(job).then(alert("Job has been posted successfully"));
    }
}

export function getMyJobs() {
    return dispatch => {
        // firebase.auth().onAuthStateChanged(() => {
        let userId = firebase.auth().currentUser.uid
        firebase.database().ref('/jobs/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {

            let jobs = snapshot.val();

            // console.log(jobs);
            // this.setState({ job: obj });
            dispatch({ type: ActionTypes.JOBS, payload: jobs })
            // console.log(this.state.job)
        }
        );
        // })
    }
}
export function getStudentList() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(() => {
            let userId = firebase.auth().currentUser.uid
            firebase.database().ref('users/' + userId).once('value')
                .then((userData) => {
                    let currentUser = userData.val();
                    firebase.database().ref('users/').orderByChild("userType").equalTo('std').on('value', function (snapshot) {
                        let students = snapshot.val();
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        dispatch({ type: ActionTypes.STUDENTS, payload: students })
                    })
                })
        })
    }
}

export function getCompanyList() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(() => {
            let userId = firebase.auth().currentUser.uid
            firebase.database().ref('users/' + userId).once('value')
                .then((userData) => {
                    let currentUser = userData.val();
                    firebase.database().ref('users/').orderByChild("userType").equalTo('com').on('value', function (snapshot) {
                        let companies = snapshot.val();
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        dispatch({ type: ActionTypes.COMPANIES, payload: companies })
                    })
                })
        })
    }
}
export function getApplicants(key) {
    return dispatch => {
        // var keys = this.props.keys;
        console.log(key)
        var applicants = [];

        var applications;
        var data;
        // firebase.auth().onAuthStateChanged(() => {
        //     var userId = firebase.auth().currentUser.uid;

        var i = 0;
        firebase.database().ref('/jobs/' + key + '/applications').on("value", function (snapshot) {
            applicants = snapshot.val();
            console.log(applicants)
            dispatch({ type: ActionTypes.APPLICANTS, payload: applicants })
            // this.setState({ jobApplications: applicants });
            // console.log(this.state.jobApplications);
        }
        );
        // });
    }
}
export function deleteCompany(key) {
    return dispatch => {
        firebase.database().ref('users/' + key).remove();
    }
}
export function deleteStudent(key) {
    return dispatch => {
        firebase.database().ref('users/' + key).remove();
    }
}
export function getJobList() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(() => {
            let userId = firebase.auth().currentUser.uid
            firebase.database().ref('users/' + userId).once('value')
                .then((userData) => {
                    let currentUser = userData.val();
                    firebase.database().ref('jobs/').on('value', function (snapshot) {

                        let allJobs = snapshot.val();
                        // console.log(allJobs)
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        dispatch({ type: ActionTypes.ALL_JOBS, payload: allJobs })
                    })
                })
        })
    }
}

export function applyForJob(key) {
    return dispatch => {
        firebase.auth().onAuthStateChanged(() => {
            var obj = []
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).once('value')
                .then((userData) => {
                    let currentUser = userData.val();
                    firebase.database().ref('/jobs/' + key + '/applications').orderByChild("applicantUId").equalTo(currentUser.uid).once("value").then((snapshot) => {
                        obj = snapshot.val();
                        console.log(obj);

                        if (obj === null) {

                            firebase.database().ref('/jobs/' + key + '/applications').push({
                                // ...this.state.user,
                                applicantUId: currentUser.uid,
                                name: currentUser.username,
                                email: currentUser.email,
                                // education: this.state.user.education,
                                // gpa: this.state.user.gpa,
                                // skills: this.state.user.skills,
                                // overview: this.state.user.overview
                            });

                        }
                        else {
                            alert("you have already applied to this job");
                        }
                    })
                })

        })
    }
}

export function deleteJob(jobId) {
    return dispatch => {
        firebase.database().ref('jobs/' + jobId).remove();

    }
}

