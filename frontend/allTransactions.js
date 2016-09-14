import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';

export default class AllTransactions extends React.Component {
  constructor(){
    super();
    this.getTransaction = this._getTransaction
    this.displayTransactions = this._displayTransactions
    this.sumTransactions = this._sumTransactions
    this._checkSum()
    this.state = {
      transactions: [],
      status: 'to collect',
      total: 'To Collect',
      sum: []
    }
  }

  _getTransaction(){
    const transaction = new Transaction()
    transaction.getAll().then(data => {
      this.setState({
        transactions: data
      })
    })
    .catch(error => console.log(error))
  }

  _checkSum() {
    if (this.sumTransactions < 0) {
      this.sumTransactions = -this.sumTransactions;
      this.setState({
        total: "To pay"
      })
    }
  }

_displayTransactions(){
let trans = this.state.transactions.map((transaction) => {
  return(
    <tr>
      <td>{transaction.createdAt}</td>
      <td>{transaction.second_user}</td>
      <td>{transaction.item}</td>
      <td>{transaction.amount < 0 ? 'to pay': 'to collect'}</td>
      <td>{transaction.amount}</td>
    </tr>
  )
})
return trans;
}

_sumTransactions() {
  return this.state.transactions
  .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
}


  componentWillMount(){
    this.getTransaction();

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
              <th>Action</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>-</td>
              <td>-</td>
              <td>{this.state.total}</td>
              <td>{this.sumTransactions()}</td>
            </tr>
          </tfoot>
          <tbody>

            {this.displayTransactions()}

          </tbody>
        </table>
      </div>
    )
  }
}
