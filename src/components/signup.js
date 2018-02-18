import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { signupAction, checkLogin } from '../store/action/action';
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

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {

            error: null,
            info: null,
            email: '',
            password: '',
            userName: '',
            userType: 'std',
            open: false,
            errorUserName: '',
            errorEmail: '',
            errorPassword: ''
        }


        this.signup = this.signup.bind(this);
        // this._onChangeEmail = this._onChangeEmail.bind(this);
        // this._onChangeUserName = this._onChangeUserName.bind(this);
        // this._onChangePassword = this._onChangePassword.bind(this);

    }
    componentWillMount() {
        this.props.checkLogin()
        // console.log(this.refs.shipSpeed.getSelectedValue())
    }
    _onChange(e, selected) {
        let value = this.refs.shipSpeed.getSelectedValue();
        console.log('selected', selected);
        this.setState({
            userType: selected

        })
    }


    signup() {
        if (this.state.userName === '' && this.state.email === '' && this.state.password === '') {
            this.setState({ open: true, error: 'All fields are required' });

        }
        else {
            let user = {
                email: this.state.email,
                username: this.state.userName,
                password: this.state.password,
                userType: this.state.userType
            }
            this.setState({
                email: '',
                userName: '',
                password: ''
            })
            this.props.signupwithEmailPassword(user);
        }
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
                            <h1 style={{ color: 'rgb(0, 188, 212)' }}>SIGN UP FORM</h1>

                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'userName', 'errorUserName')

                                }
                                hintText="Enter Your User Name"
                                floatingLabelText="User Name"
                                errorText={this.state.errorUserName}
                                value={this.state.userName}
                            /><br />
                            <br />

                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'email', 'errorEmail')

                                }
                                hintText="Enter Your Email"
                                floatingLabelText="Email"
                                errorText={this.state.errorEmail}
                                value={this.state.email}
                            /><br />
                            <br />


                            <PasswordField
                                onChange={
                                    this.handleForm.bind(this, 'password', 'errorPassword')

                                }
                                floatingLabelText="Password"
                                errorText={this.state.errorPassword}
                                value={this.state.password}
                            /> <br /><br />
                            <RadioButtonGroup name="shipSpeed" defaultSelected="std" ref="shipSpeed" onChange={this._onChange.bind(this)}>
                                <RadioButton
                                    value="std"
                                    label="Student"
                                    style={styles.radioButton}

                                />
                                <RadioButton
                                    value="com"
                                    label="Company"
                                    style={styles.radioButton}


                                />

                            </RadioButtonGroup>
                            <RaisedButton label='Signup' primary={true} style={{ marginLeft: '30%' }} onClick={this.signup.bind(this)} />
                            <br /><Link to="/" ><FlatButton label="ALREADY HAVE A ACCOUNT? LOGIN NOW" /></Link>
                            <br /><br />
                        </Paper>
                    </div>
                }
            </div>




        )
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

function mapStateToProp(state) {
    return ({
        login: state.root.login
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        },
        checkLogin: () => {
            dispatch(checkLogin())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

