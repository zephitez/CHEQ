import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';

export default class AllTransactions extends React.Component {
  constructor(){
    super();
    this._getTransaction = this._getTransaction.bind(this);
  }

  _getTransaction(){
    const transaction = new Transaction()
    transaction.getAll()
      .then((data)=> {
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  componentWillMount(){
    this._getTransaction();
  }
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
