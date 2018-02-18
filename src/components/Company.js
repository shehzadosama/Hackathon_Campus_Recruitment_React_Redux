import React, { Component } from 'react';
import logo from './logo.svg';
import { checkLoginAndFetchData, checkLogin, signOut, } from '../store/action/action'
import { connect } from 'react-redux';
// import './App.css';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import Login from "./Login"
// import Signup from "./Signup"
import CircularProgress from 'material-ui/CircularProgress';
class Company extends Component {
  constructor() {
    super();
    this.state = {
      user: null
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
    console.log('sss')
    return (
      <div style={{ width: 600, margin: 'auto' }}>
        {this.props.login === false ? <CircularProgress size={150} thickness={10} /> :
          <div>
            <h1 style={{ color: 'rgb(0, 188, 212)' }}>WELCOME TO COMPANY PANEL  </h1>

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
export default connect(mapStateToProp, mapDispatchToProp)(Company);