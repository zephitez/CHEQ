import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component {
  render(){
    return(
      <div>
        <h3> hello world </h3>
      </div>
    )
  }
}

export default Dashboard

ReactDOM.render(
  <Dashboard />, document.getElementById('app')
)
