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
import { connect } from 'react-redux';
// import Login from "./Login"
// import Signup from "./Signup"
import { checkLoginAndFetchData, checkLogin, signOut, postJob, getMyJobs, applyForJob, deleteJob, getStudentList, getJobList } from '../store/action/action'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
class ListJobs extends Component {

  constructor() {
    super();


    this.state = {
      userType: null,
      name: null,
      students: []
    };
  }
  componentWillMount() {
    this.props.getJobList();
  }

  deleteStudent(key) {
    // console.log(key);
    // firebase.database().ref('users/' + key).remove();
  }

  deleteJob(key) {
    this.props.deleteJob(key)
   
  }
  applyForJob(key) {
    this.props.applyForJob(key)
  }

  render() {
    let allJobs = "";
    let btn = "";
    let key;

    if (this.props.allJobs !== null) {
      allJobs = Object.keys(this.props.allJobs).map((key, index) => {
        // btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
        // btn = <RaisedButton label='DELETE' onClick={this.deleteJob.bind(this, key)} secondary={true} />



        if (this.props.currentUser.userType === 'admin') {
          btn = <RaisedButton label='DELETE' onClick={this.deleteJob.bind(this, key)} secondary={true} />
        }
        else if (this.props.currentUser.userType === 'std') {
          btn = <RaisedButton label='APPLY' onClick={this.applyForJob.bind(this, key)} primary={true} />

        }
        return (
          <Card key={index}>
            <CardHeader
              title={

                <h2>JOB TITLE:   <span>{this.props.allJobs[key].jobTitle}</span></h2>
              }
              subtitle={
                <div>
                  <h2>DESCRIPTION:   <span>{this.props.allJobs[key].jobDesc}</span></h2>

                  <h2>SALARY:  <span>{this.props.allJobs[key].sal}</span></h2>
                  <h2>COMPANY NAME:  <span>{this.props.allJobs[key].companyName}</span></h2>
                </div>
              }
            // actAsExpander={true}
            // showExpandableButton={true}
            />
            <CardActions>
              {btn}
            </CardActions>

          </Card>

        )
      })
    }
    else {
      return (
        <Card>
          <CardHeader
            title="NO JOBS AVAILABLE"
          // actAsExpander={true}
          // showExpandableButton={true}
          />
          <CardActions>
          </CardActions>
        </Card>
      )
    }
    return (

      <div >

        <h1 style={{ color: 'rgb(0, 188, 212)' }}>ALL JOBS </h1>

        {allJobs}

      </div>
    );

  }
}
function mapStateToProp(state) {
  return ({
    currentUser: state.root.currentUser,
    jobs: state.root.jobs,
    login: state.root.login,
    students: state.root.students,
    allJobs: state.root.allJobs

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
    getMyJobs: () => {
      dispatch(getMyJobs());
    },
    deleteJob: (key) => {
      dispatch(deleteJob(key));
    },
    getStudentList: () => {
      dispatch(getStudentList());
    },
    getJobList: () => {
      dispatch(getJobList());
    },
    applyForJob: (key) => {
      dispatch(applyForJob(key));
    },
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(ListJobs);