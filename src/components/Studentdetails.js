import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import Login from "./Login"
// import Signup from "./Signup"
import { checkLoginAndFetchData, checkLogin, signOut,  signupAction} from '../store/action/action'
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import { signupAction, checkLogin } from '../store/action/action';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
const style = {
  width: 400,
  margin: 20,
  textAlign: 'left',
  paddingLeft: 60,
  paddingTop: 10,
  display: 'inline-block',
}
class Studentdetails extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      error: null,
      name: '',

      // name: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;
      // console.log(userId);
      // var userId = "XH0agfzeijcCDYnMX1ff1JfJLRT2";

      console.log(userId);
      const rootRef = firebase.database().ref();
      const speedRef = rootRef.child('users/' + userId);
      speedRef.on('value', snap => {


        var userObj = snap.val();

        this.setState({ user: userObj });

        this.refs.name.value = this.state.user.name;
        this.refs.education.value = this.state.user.education;
        this.refs.gpa.value = this.state.user.gpa;
        this.refs.skills.value = this.state.user.skills;
        this.refs.overview.value = this.state.user.overview;
        if (this.state.user.education == undefined) this.refs.education.value = "";
        if (this.state.user.gpa == undefined) this.refs.gpa.value = "";
        if (this.state.user.skills == undefined) this.refs.skills.value = "";
        if (this.state.user.overview == undefined) this.refs.overview.value = "";
      });
    })
  }

  update() {
    const name = this.refs.name.value;
    const education = this.refs.education.value;
    const gpa = this.refs.gpa.value;
    const skills = this.refs.skills.value;
    const overview = this.refs.overview.value;
    if (name === '' || education === '' || gpa === '' || skills === '' || overview === '') {
      this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
      this.refs.name.focus();
      // alert("all fields are required");
    } else {

      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).set({
        ...this.state.user,

        name: name,
        education: education,
        gpa: gpa,
        skills: skills,
        overview: overview

      });


      alert("Data has been updated success")
      this.props.history.push('/Student');
    }

  }

  updateProfile() {
    if (this.state.userName === '' && this.state.email === '' && this.state.password === '') {
      this.setState({ open: true, error: 'All fields are required' });

    } else {
      this.props.updateProfile()
    }
  }
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
              <h1 style={{ color: 'rgb(0, 188, 212)' }}>UPDATE STUDENT</h1>

              <TextField
                onChange={
                  this.handleForm.bind(this, 'fullName', 'errorFullName')

                }
                hintText="Enter Your Full Name"
                floatingLabelText="Full Name"
                errorText={this.state.errorFullName}
                value={this.state.fullName}
              /><br />
              <br />

              <TextField
                onChange={
                  this.handleForm.bind(this, 'education', 'errorEducation')

                }
                hintText="Enter Your Education"
                floatingLabelText="Education"
                errorText={this.state.errorEducation}
                value={this.state.education}
              /><br />
              <br />
              <TextField
                onChange={
                  this.handleForm.bind(this, 'gpa', 'errorGpa')

                }
                hintText="Enter Your GPA"
                floatingLabelText="GPA"
                errorText={this.state.errorGpa}
                value={this.state.gpa}
              /><br />
              <br />
              <TextField
                onChange={
                  this.handleForm.bind(this, 'skills', 'errorSkills')

                }
                hintText="Enter Your Skills"
                floatingLabelText="Skills"
                errorText={this.state.skills}
                value={this.state.errorSkills}
              /><br />
              <br />
              <TextField
                onChange={
                  this.handleForm.bind(this, 'overview', 'errorOverview')

                }
                hintText="Enter Your Overview"
                floatingLabelText="Overview" errorOverview
                errorText={this.state.errorEmail}
                value={this.state.overview}
              /><br />
              <br />

              <RaisedButton label='UPDATE' primary={true} style={{ marginLeft: '30%' }} onClick={this.updateProfile.bind(this)} />
              <br />
              <br /><br />
            </Paper>
          </div>
        }
      </div>




    )


    // return (
    //   <div className="containerList">
    //     <h1>EDIT STUDENT DETAILS</h1>
    //     <span id="error">{this.state.error}</span >
    //     <input className="name" type="text" ref="name" placeholder="Full Name" /><br />
    //     <input className="education" type="text" ref="education" placeholder="Education" /><br />
    //     <input className="gpa" type="text" ref="gpa" placeholder="GPA" /><br />
    //     <input className="skills" type="text" ref="skills" placeholder="Skills" /><br />
    //     <input className="overview" type="text" ref="overview" placeholder="Overview" /><br /><br />
    //     <button onClick={this.update.bind(this)}>UPDATE</button>
    //   </div>
    // );
  }
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
    checkLogin: () => {
      dispatch(checkLogin())
    },
    signOut: () => {
      dispatch(signOut())
    },

    checkLoginAndFetchData: () => {
      dispatch(checkLoginAndFetchData());
    },
    // updateProfile: () => {
    //   dispatch(updateProfile());
    // },
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Studentdetails);