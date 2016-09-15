import React from 'react';
import User from './models/User';
import Transaction from './models/Transaction';


export default class EachTransaction extends React.Component {

    constructor(){
      super();
      this.state = {
        transactions: []
      }

    }


    _getUserTransactions(){
      const transaction = new Transaction()

      transaction.getAll().then(data => {
        this.setState({
          transactions: data
        })
      })
      .catch(error => console.log(error))
    }


  _filterSumByUser(){

    // an array of objects containing transaction information
    let trans = this.state.transactions

    // instantiate array to contain only names from the transaction objects
    let nameArr = [];

    // retrieve names from transaction objects
    trans.map((transaction) => {
      nameArr = nameArr.concat(transaction.second_user_name);
    })

    // get another array (filtering unique names from nameArr)
    let uniqueArr = Array.from(new Set(nameArr));

    console.log("uniqueArr is ", uniqueArr);

    // instanstiate an object to hold <key> names and their <value> net amounts
    let netAmt = {};

    // for the number of unique names, loop through the object array
    for (var i = 0; i < uniqueArr.length; i++) {
      // important to instantiate the <key> and <value> here
      netAmt[uniqueArr[i]] = 0
      // an inner loop to match names in uniqueArr and those per object; if there is a match, add the amount of that transaction to the unique name
      trans.map((transaction) => {
        if (transaction.second_user_name == uniqueArr[i]) {
          console.log(netAmt[uniqueArr[i]]);

        netAmt[uniqueArr[i]] += transaction.amount
        }
      })
    }

  console.log(netAmt);

return nameArr;
}

  //
  // _sumTransactions() {
  //   let sum = this.state.transactions
  //   .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
  //
  //   return (
  //     <tr>
  //     <td>Total</td>
  //     <td>-</td>
  //     <td>-</td>
  //     <td>{sum < 0 ? this.toPay : this.toCollect }</td>
  //     <td>{sum < 0 ? -sum : sum }</td>
  //     </tr>
  //   )
  // }
  //
  //
    componentWillMount(){
      this._getUserTransactions();
    }
  render(){
    return(
      <div>
        <p>
        <strong>User 1 </strong>
        pay or collect
        <strong> User 2 </strong>
        transaction <br/>
        </p>
        <p>{this._filterSumByUser()}</p>
      </div>
    )
  }

}
