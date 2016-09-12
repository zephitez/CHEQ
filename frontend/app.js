import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'

class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <h3 className="title">cool beans</h3>
      </div>
    )
  }
}

class SeeAll extends React.Component {
  render(){
    return(
      <div>
        <h3 className="title">See All</h3>
      </div>
    )
  }
}

export default Dashboard

ReactDOM.render((
  <Router history={browserHistory}>
    <Router path="dashboard" component={Dashboard}/>
    <Router path="dashboard/seeall" component={SeeAll}/>
  </Router>
), document.getElementById('app'))

// ReactDOM.render(
//   <Dashboard />, document.getElementById('app')
// )
