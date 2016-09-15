import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import AllTransactions from './allTransactions';
import Friend from './friend';
import EachTransaction from './eachTransaction';
import Form from './form';
import User from './models/User'

class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <h1 className="title">Dashboard</h1>
        <div className="columns">
          <div className="column">
            <div className="box topay">
              <p className="subtitle"> <strong>PAY TO</strong></p>
              <EachTransaction type="payTo"/>
            </div>
          </div>
          <div className="column">
            <div className="box tocollect">
              <p className="subtitle"> <strong>COLLECT FROM</strong></p>
              <EachTransaction type="collectFrom"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard

ReactDOM.render((
  <Router history={browserHistory}>
    <Router path="dashboard" component={Dashboard}/>
    <Router path="dashboard/all" component={AllTransactions}/>
    <Router path="dashboard/friend" component={Friend}/>
    <Router path="dashboard/form" component={Form}/>
  </Router>
), document.getElementById('app'))
