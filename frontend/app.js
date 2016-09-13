import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import All from './all';
import Friend from './friend';

class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <h3 className="title">Dashboard</h3>
        <div className="columns">
          <div className="column">
            column 1
          </div>
          <div className="column">
            column 2
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
    <Router path="dashboard/all" component={All}/>
    <Router path="dashboard/friend" component={Friend}/>
  </Router>
), document.getElementById('app'))

// ReactDOM.render(
//   <Dashboard />, document.getElementById('app')
// )
