import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';

export default class AllTransactions extends React.Component {
  constructor(){
    super();
    this.state = {
      transactions: []
    }
    this.toPay = "To Pay";
    this.toCollect = "To Collect";
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


_displayTransactions(){
  let trans = this.state.transactions.map((transaction) => {
  return(
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.second_user_name}</td>
      <td>{transaction.item}</td>
      <td>{transaction.amount < 0 ? this.toPay : this.toCollect }</td>
      <td>{transaction.amount < 0 ? -transaction.amount : transaction.amount }</td>
    </tr>
  )
})
return trans;
}

_sumTransactions() {
  let sum = this.state.transactions
  .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)

  return (
    <tr>
    <td>Total</td>
    <td>-</td>
    <td>-</td>
    <td>{sum < 0 ? this.toPay : this.toCollect }</td>
    <td>{sum < 0 ? -sum : sum }</td>
    </tr>
  )
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
              <th>Action</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>

            {this._displayTransactions()}

          </tbody>
          <tfoot>

              {this._sumTransactions()}

          </tfoot>
        </table>
      </div>
    )
  }
}
