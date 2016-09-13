import React from 'react';
import ReactDOM from 'react-dom';

export default class All extends React.Component {
  render(){
    return(
      <div>
        <h3 className="title">All Activities</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Friend</th>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
