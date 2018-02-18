import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import Student from "./components/Student"
import Company from "./components/Company"
import Studentdetails from "./components/Studentdetails"
import ListJobs from "./components/ListJobs"
import CompanyList from "./components/CompanyList"
import PostJob from "./components/PostJob"
import PostedJobs from "./components/PostedJobs"
import StudentList from "./components/StudentList"
import Admin from "./components/Admin"
import Applications from "./components/Applications"
// import './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from "./components/NavBar";
import history from './History';

// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <MuiThemeProvider>
                    <div>
                        <Route path="/" component={NavBar} />
                        <Route exact path="/" component={Signin} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/Student" component={Student} />
                        <Route exact path="/Company" component={Company} />
                        {/* <Route exact path="/Student/Studentdetails" component={Studentdetails} /> */}
                        <Route exact path="/Student/ListJobs" component={ListJobs} />
                        <Route exact path="/Student/CompanyList" component={CompanyList} />
                        <Route exact path="/Company/PostJob" component={PostJob} />
                        <Route exact path="/Company/PostedJobs" component={PostedJobs} />
                        <Route exact path="/Company/StudentList" component={StudentList} />
                        <Route exact path="/Company/Applications" component={Applications} />
                        <Route exact path="/Admin" component={Admin} />
                        <Route exact path="/Admin/StudentList" component={StudentList} />
                        <Route exact path="/Admin/ListJobs" component={ListJobs} />
                        <Route exact path="/Admin/CompanyList" component={CompanyList} />
                    </div>
                </MuiThemeProvider>
            </Router>
        )
    }
}

export default Routers;