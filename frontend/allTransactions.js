import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';

export default class AllTransactions extends React.Component {
  constructor(){
    super();
    this.getTransaction = this._getTransaction.bind(this);
    this.displayTransactions = this._displayTransactions.bind(this);
    this.state = {
      transactions: [],
      status: 'to collect'
    }
  }

  _getTransaction(){
    const transaction = new Transaction()
    transaction.getAll()
      .then((data)=> {
        console.log(data);
        this.setState({
          transactions: data
        })

      })
      .catch(error => console.log(error))
  }

_displayTransactions(){
let trans = this.state.transactions.map( (transaction) => {
    if (transaction.amount < 0) {
      transaction.amount = -transaction.amount;
      this.setState({
        status: "to pay"
      })
    }

  return(
    <tr>
      <td>{transaction.createdAt}</td>
      <td>{transaction.second_user_name}</td>
      <td>{transaction.item}</td>
      <td>{this.state.status}</td>
      <td>{transaction.amount}</td>

    </tr>
  )

})
return trans;
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
          <tbody>

             {this.displayTransactions()}

          </tbody>
        </table>
      </div>
    )
  }
}
