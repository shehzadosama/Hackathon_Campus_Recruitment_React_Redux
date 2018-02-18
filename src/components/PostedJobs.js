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
import Applications from "./Applications"
import { connect } from 'react-redux';
// import Login from "./Login"
// import Signup from "./Signup"
import { checkLoginAndFetchData, checkLogin, signOut, postJob, getMyJobs, deleteJob, getApplicants } from '../store/action/action'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

class PostedJobs extends Component {

  constructor() {
    super();

    this.state = {
      job: [],
      open: false,

    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleDialog = () => {
    console.log('open')
    this.setState({ open: !this.state.open });
  };

  componentWillMount() {
    this.props.getMyJobs()
  }

  deleteJob(key) {
    console.log(key);
    this.props.deleteJob(key)
    // firebase.database().ref('jobs/' + key).remove();
  }
  getApplicants(key) {
    console.log(key);
    this.props.getApplicants(key)
    this.setState({ open: !this.state.open });
    // firebase.database().ref('jobs/' + key).remove();
  }



  render() {
    console.log(this.props.applicants)
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
    // console.log(this.props.jobs)
    let jobs = "";
    let btn = "";
    let key;
    let btn1 = "";
    let dialog;
    if (this.props.applicants !== null) {
      dialog = Object.keys(this.props.applicants).map((key, index) => {

        return (<div>
          <Card key={index}>
            <CardHeader
              title={
                // `TITLE: ${this.props.jobs[key].jobTitle}`
                <h2>Name:  {this.props.applicants[key].name} <span></span></h2>
              }
              subtitle={
                <div>
                  <h2>email:  {this.props.applicants[key].email}  <span></span></h2>
                 
                </div>
              }
            // actAsExpander={true}
            // showExpandableButton={true}
            />
            <CardActions>
              {btn}
              {btn1}
            </CardActions>

          </Card>
        </div>)
      })
    }
    if (this.props.jobs !== null) {
      jobs = Object.keys(this.props.jobs).map((key, index) => {
        // btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
        btn = <RaisedButton label='DELETE' onClick={this.deleteJob.bind(this, key)} secondary={true} />
        btn1 = <RaisedButton label='APPLICANTS' onClick={this.getApplicants.bind(this, key)} primary={true} />
        return (<div>
          <Dialog
            // title="ERROR"
            title="Applicants"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleDialog}
            autoScrollBodyContent={true}
          >{this.state.error}
            {dialog}
          </Dialog>
          <Card key={index}>
            <CardHeader
              title={
                // `TITLE: ${this.props.jobs[key].jobTitle}`
                <h2>JOB TITLE:   <span>{this.props.jobs[key].jobTitle}</span></h2>
              }
              subtitle={
                <div>
                  <h2>DESCRIPTION:   <span>{this.props.jobs[key].jobDesc}</span></h2>
                  <h2>SALARY:  <span>{this.props.jobs[key].sal}</span></h2>
                </div>
                // `DESCRIPTION: ${this.props.jobs[key].jobDesc}\n SALARY: ${this.props.jobs[key].sal}`
              }
            // actAsExpander={true}
            // showExpandableButton={true}
            />
            <CardActions>
              {btn}
              {btn1}
            </CardActions>

          </Card>
        </div>
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

        <h1 style={{ color: 'rgb(0, 188, 212)' }}>My Jobs </h1>

        {jobs}

      </div>
    );

  }
}
function mapStateToProp(state) {
  return ({
    currentUser: state.root.currentUser,
    jobs: state.root.jobs,
    login: state.root.login,
    applicants: state.root.applicants

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
    getApplicants: (key) => {
      dispatch(getApplicants(key));
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(PostedJobs);