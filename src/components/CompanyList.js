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
import { checkLoginAndFetchData, deleteCompany, checkLogin, signOut, getCompanyList, postJob, getMyJobs, deleteJob, getStudentList } from '../store/action/action'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
class CompanyList extends Component {

  constructor() {
    super();


    this.state = {
      userType: null,
      name: null,
      students: []
    };
  }
  componentWillMount() {
    this.props.getCompanyList()
  }

  deleteStudent() {
    //   console.log(key);
    // firebase.database().ref('jobs/' + key).remove();
  }



  deleteCompany(key) {
    console.log(key);
    this.props.deleteCompany(key)
    // firebase.database().ref('users/' + key).remove();
  }



  render() {
    let companies = "";
    let btn = "";
    let key;

    if (this.props.companies !== null) {
      companies = Object.keys(this.props.companies).map((key, index) => {
        // btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
        // btn = <RaisedButton label='DELETE' onClick={this.deleteJob.bind(this, key)} secondary={true} />
        if (this.props.currentUser.userType === 'admin') {
          btn = <RaisedButton label='DELETE' onClick={this.deleteCompany.bind(this, key)} secondary={true} />
        }

        return (
          <Card key={index}>
            <CardHeader
              title={
                // `TITLE: ${this.props.jobs[key].jobTitle}`
                <h2>NAME:   <span>{this.props.companies[key].username}</span></h2>
              }
              subtitle={
                <div>
                  <h2>EMAIL:   <span>{this.props.companies[key].email}</span></h2>
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
            title="NO COMPANIES AVAILABLE"
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

        <h1 style={{ color: 'rgb(0, 188, 212)' }}>ALL COMPANIES </h1>

        {companies}

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
    companies: state.root.companies

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
    getCompanyList: () => {
      dispatch(getCompanyList());
    },
    deleteCompany: (key) => {
      dispatch(deleteCompany(key));
    },
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(CompanyList);