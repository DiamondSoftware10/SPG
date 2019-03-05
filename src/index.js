import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Loading from './Components/Loading';

ReactDOM.render(<Loading />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


