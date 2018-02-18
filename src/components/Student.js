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
import Studentdetails from "./Studentdetails"
import {  checkLoginAndFetchData, checkLogin, signOut, } from '../store/action/action'
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
class Student extends Component {
  constructor() {
    super();


    this.state = {
      user: null,
      userType: null
    };



  }


  componentWillMount() {
    console.log('sss')
    this.props.checkLoginAndFetchData()
    // if (this.props.login) {
    //     this.props.fetchData()
    // }
  }
  



  render() {
    return (
      //     <div>   
      // {this.state.user?       
      // <div>
      //   <h1>WELCOME TO STUDENT PANEL  </h1>
      //   <button onClick={this.signOut.bind(this)}> SIGN OUT </button>
      //   <h2 className="username">{this.state.user}</h2>
      //   <h2>Personal Info</h2>
      //   <p><Link to="/Student/Studentdetails">Edit details</Link></p>
      //   <p><Link to="/Student/ListJobs">View All Jobs</Link></p>
      //   <p><Link to="/Student/CompanyList">View companies</Link></p>
      // </div>

      //   :
      //   <h1>
      //     loading...
      //   </h1>
      //   }
      // </div>

      <div>
        {this.props.login === false ? <CircularProgress size={150} thickness={10} /> :
          //     <div>
          //       <h1>WELCOME TO Company PANEL</h1>
          //       <button onClick={this.signOut.bind(this)}> SIGN OUT </button>

          //       <h2>Personal Info</h2>
          //       <h2 className="username">{this.props.currentUser.username}</h2>
          //       <p><Link to="/Company/PostJob">Post Jobs</Link></p>
          //       <p><Link to="/Company/PostedJobs">My posted jobs</Link></p>
          //       <p><Link to="/Company/StudentList">Students</Link></p>
          //     </div>}
          // </div>
          <div style={{ width: 600, margin: 'auto' }}>
            <h1 style={{ color: 'rgb(0, 188, 212)' }}>WELCOME TO STUDENT PANEL  </h1>

            <h2 className="username" style={{ color: 'rgb(0, 188, 212)' }}>UserName: {this.props.currentUser.username}</h2>

          </div>
        }
      </div>
    );
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
    // changeUserName: ()=>{dispatch(changeUserName())}
    
    checkLogin: () => {
      dispatch(checkLogin())
    },
    signOut: () => {
      dispatch(signOut())
    },
 
    checkLoginAndFetchData: () => {
      dispatch(checkLoginAndFetchData());
    },
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(Student);