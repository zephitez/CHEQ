import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';

export default class AllTransactions extends React.Component {
  constructor(){
    super();
    this.state = {
      transactions: []
    }
    this.payTo = "Pay To";
    this.collectFrom = "Collect From";

    this.toPay = "to pay";
    this.toCollect = "to collect";
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

    let transAmount = transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2});
    let NegativeTransAmount = (transaction.amount * (-1)).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2});

  return(
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.item}</td>
      <td>{transaction.amount < 0 ? this.payTo : this.collectFrom }</td>
      <td>{transaction.second_user_name}</td>
      <td className="has-text-right">{transaction.amount < 0 ?  NegativeTransAmount : transAmount }</td>
    </tr>
  )
})
return trans;
}

_sumTransactions() {
  let sum = this.state.transactions
  .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)

   let sumValue = sum.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2});
   let NegSumValue = (sum * (-1)).toLocaleString(undefined, {
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2});
  return (
    <tr>
    <td><strong>Total</strong></td>
    <td>-</td>
    <td>-</td>
    <td><strong>{sum < 0 ? this.toPay : this.toCollect }</strong></td>
    <td className="has-text-right"><strong>{sum < 0 ? NegSumValue : sumValue }</strong></td>
    </tr>
  )
}

_summary(){
  let sum = this.state.transactions
  .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)

  let sumValue = sum.toLocaleString(undefined, {
                 minimumFractionDigits: 2,
                 maximumFractionDigits: 2});
  let NegSumValue = (sum * (-1)).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2});

  return (
    <div className="box has-text-centered">
      <h2 className="subtitle">You have <strong>{sum < 0 ? this.toPay : this.toCollect } ${sum < 0 ? NegSumValue : sumValue }</strong> in total.</h2>
    </div>
  )
}


  componentWillMount(){
    this._getTransaction();
  }
  render(){

    return(
      <div>
        {this._summary()}
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Action</th>
              <th>Friend</th>
              <th className="has-text-right">Amount ($)</th>
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
