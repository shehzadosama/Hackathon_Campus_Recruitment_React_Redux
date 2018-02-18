import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBJkZpPY5sRCVI4FtJN57X-Pcd7kz5TShA",
    authDomain: "react-hackathon-33944.firebaseapp.com",
    databaseURL: "https://react-hackathon-33944.firebaseio.com",
    projectId: "react-hackathon-33944",
    storageBucket: "react-hackathon-33944.appspot.com",
    messagingSenderId: "323336952134"
  };
  firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
