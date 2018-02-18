import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { connect } from 'react-redux';
// import Login from "./Login"
// import Signup from "./Signup"
import { checkLoginAndFetchData, checkLogin, signOut, postJob } from '../store/action/action'

import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
class PostJob extends Component {

  constructor() {
    super();


    this.state = {
      userid: null,
      job: [],
      name: null,
      error: null,
      jobTitle: '',
      sal: '',
      jobDesc: '',
      errorJobTitle: '',
      errorSal: '',
      errorJobDesc: '',
      error: null,
      info: null,
      open: false


    };
  }
  componentWillMount() {
    console.log('sss')
    this.props.checkLoginAndFetchData()
    // if (this.props.login) {
    //     this.props.fetchData()
    // }
  }
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(() => {

  //     // //       this.setState((prev)=>({
  //     // //      jobs: prev.jobs.concat(job) 
  //     // //  } ))
  //     var userId = firebase.auth().currentUser.uid;
  //     //     // console.log(userId);
  //     this.setState({ userId: userId });

  //     //     console.log(userId);
  //     const rootRef = firebase.database().ref();
  //     const speedRef = rootRef.child('users/' + userId);
  //     speedRef.on('value', snap => {

  //       var username = snap.val().name;
  //       // var userObj = snap.val();
  //       // console.log(userObj)
  //       // this.setState({user: userObj});
  //       this.setState({ name: username });
  //       //  console.log(this.state.user);
  //       // this.refs.name.value= this.user.name; 
  //     });
  //     //   })
  //     this.setState({ job: 'jobData' });
  //   });
  // }


  postJob() {
    console.log('post job')
    if (this.state.jobTitle === '' || this.state.sal === '' || this.state.jobDesc === '') {
      this.setState({ open: true, error: 'All fields are required' });

    }
    else {
      let job = {
        jobTitle: this.state.jobTitle,
        sal: this.state.sal,
        jobDesc: this.state.jobDesc,
        uid: this.props.currentUser.uid,
        companyName: this.props.currentUser.username
      }
      console.log(job)
      this.setState({
        jobTitle: '',
        sal: '',
        jobDesc: ''
      })
      this.props.postJob(job);

    }
    // ev.preventDefault();

    // const jobTitle = this.refs.jobTitle.value;
    // const sal = this.refs.sal.value;
    // const desc = this.refs.desc.value;
    // var jobData = {
    //   title: jobTitle,
    //   salary: sal,
    //   desc: desc,
    //   uid: this.state.userId,
    //   companyName: this.state.name
    // };
    // console.log(jobData);

    // if (jobTitle === '' || sal === '' || desc === '') {
    //   this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
    //   this.refs.jobTitle.focus();
    //   //  alert("all fields are required");
    // } else {

    //   //  var userId = firebase.auth().currentUser.uid;
    //   //  var userId = "XH0agfzeijcCDYnMX1ff1JfJLRT2";
    //   //       firebase.database().ref().push(){
    //   //     //   ...this.state.user,
    //   //       // name:(name || this.state.user.name),
    //   //       // email:(email  || this.state.user.name)
    //   //     //   name:name,
    //   //     //  education:education ,
    //   //     //  gpa:gpa ,
    //   //     // skills:skills ,
    //   //     // overview:overview 
    //   //      title: jobTitle,
    //   //         salary:sal,
    //   //         desc :desc,
    //   //         userId: 

    //   //      });
    //   this.setState((prev) => ({
    //     job: jobData
    //   }),
    //     function () {
    //       var applications = "";
    //       // console.log( this.state.jobData);
    //       // console.log( this.state.job);
    //       // do something with new state
    //       var ref = firebase.database().ref('jobs')
    //       ref.push(

    //         jobData

    //       );

    //       //   firebase.database().ref('jobs/'+key+'/applications/').set({
    //       //     name: 'a'}
    //       //   );
    //     });

    //   alert("job has been posted successfully");
    //   //  }

    // }

  }
  handleForm(labelState, error, ev) {
    // console.log(ev.target.value)
    let stmt = '';
    if (ev.target.value === '') stmt = 'This field is required';
    this.setState({
      [labelState]: ev.target.value,
      [error]: stmt
    })
  }
  handleDialog = () => {
    console.log('open')
    this.setState({ open: !this.state.open });
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleDialog.bind(this)}
      />,
      // <FlatButton
      //   label="Submit"
      //   primary={true}
      //   keyboardFocused={true}
      //   onClick={this.handleClose}
      // />,
    ];
    return (
      <div>
        <Dialog
          // title="ERROR"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialog}
        >{this.state.error}
        </Dialog>
        {this.props.login === false ? <CircularProgress size={150} thickness={10} /> :
          <div style={{ width: 600, margin: 'auto' }}>
            <Paper style={style} zDepth={5}>
              <h1 style={{ color: 'rgb(0, 188, 212)' }}>POST JOB</h1>
              <TextField
                onChange={
                  this.handleForm.bind(this, 'jobTitle', 'errorJobTitle')

                }
                hintText="Enter Your Job Title"
                floatingLabelText="Job Title"
                errorText={this.state.errorJobTitle}
                value={this.state.jobTitle}
              /><br />
              <br />
              <TextField
                onChange={
                  this.handleForm.bind(this, 'sal', 'errorSal')
                }
                hintText="Enter Your Salary"
                floatingLabelText="Salary"
                errorText={this.state.errorSal}
                value={this.state.sal}
              /><br />
              <br />
              <TextField
                onChange={
                  this.handleForm.bind(this, 'jobDesc', 'errorJobDesc')
                }
                value={this.state.jobDesc}
                hintText="Enter Your Job Description"
                floatingLabelText="Job Description"
                errorText={this.state.errorJobDesc}
              /><br />
              <br />
              <RaisedButton label='POST' primary={true} style={{ marginLeft: '30%' }} onClick={this.postJob.bind(this)} />
              <br />
              <br /><br />
            </Paper>
          </div>
        }
      </div>

    );
  }
}
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};
const style = {
  width: 400,
  margin: 20,
  textAlign: 'left',
  paddingLeft: 60,
  paddingTop: 10,
  display: 'inline-block',
}
function mapStateToProp(state) {
  return ({
    currentUser: state.root.currentUser,
    receipentDetails: state.root.receipentDetails,
    allUsers: state.root.users,
    allMessages: state.root.messages,
    recipientID: state.root.recipientID,
    msgs: state.root.msgs,
    login: state.root.login
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    // changeUserName: ()=>{dispatch(changeUserName())}

    checkLogin: () => {
      dispatch(checkLogin())
    },
    signOut: () => {
      dispatch(signOut())
    },
    postJob: (job) => {
      dispatch(postJob(job));
    },
    checkLoginAndFetchData: () => {
      dispatch(checkLoginAndFetchData());
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(PostJob);