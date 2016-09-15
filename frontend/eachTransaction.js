import React from 'react';
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
    /*
    1) Create a new object

    forEach

    do something to each item in an array

    things we want to do

    2) check if current object second user name is inside our new object
      if not inside - add it in as a new key and also add the amount as the value of that key
      if inside - we want to only add increment the amount of that object

    */

    // an array of objects containing transaction information
    let trans = this.state.transactions
    console.log('original',trans);
    // Step 1
    var newObject = {};
    // Step 2
    trans.forEach(function(obj){
      // not inside
      if (newObject[obj.second_user_name] === undefined ) {
        newObject[obj.second_user_name] = obj.amount
      } else {
        newObject[obj.second_user_name] = newObject[obj.second_user_name] + obj.amount
      }
    })
    // Step 3
    let result = [];
    for(var prop in newObject){
      if(this.props.type == "payTo" && newObject[prop] < 0){
        result.push(
          <tr key={prop}>
            <td>{prop}</td>
            <td>{(newObject[prop] * -1).toFixed(2)}</td>
          </tr>
        )
      }else if(this.props.type =="collectFrom" && newObject[prop] > 0){
        result.push(<tr key={prop}>
          <td>{prop}</td>
          <td>{(newObject[prop]).toFixed(2)}</td>
        </tr>
      )
      }

    }
    return result
  }


    componentWillMount(){
      this._getUserTransactions();
    }

  render(){
    let result = this._filterSumByUser();
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount ( $ )</th>
          </tr>
        </thead>
        <tbody>
          {result}
        </tbody>
      </table>
    )
  }

}
