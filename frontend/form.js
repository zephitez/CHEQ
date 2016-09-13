import React from 'react';
import User from './models/User'
import Transaction from './models/Transaction'

export default class Form extends React.Component{
  constructor() {
    super()
    this.state = {
      text: 'hi'
    }
  }

  postTransaction(event){
    event.preventDefault()

    const friend = this._friend.value;
    const price = this._price.value;
    const description = this._description.value;

    const data = { friend, price, description }

    const transaction = new Transaction(data)
    // transaction.getAll().then(data => console.log(data))
    // transaction.create()
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error))

  }

  render(){
    return(
      <div className="columns">
        <div className="box column is-10 is-offset-1">
          <div className="column is-8 is-offset-2">

          <form onSubmit={this.postTransaction.bind(this)}>

            <h1 className="title">Record a Transaction</h1>
            <div className="control is-horizontal">
              <div className="control is-grouped">
                <p className="control has-addons is-expanded">
                  <span className="select is-medium">
                    <select>
                    <option id="pay-to">Pay To</option>
                    <option id="collect-from">Collect From</option>
                    </select>
                  </span>
                <p className="control has-icon">
                  <input className="input is-medium" placeholder="Friend" ref={(input) => this._friend = input}/>
                  <i className="fa fa-at"></i>
                </p>
                </p>

                <p className="control has-icon is-expanded">
                    <input type="number" className="input is-medium" placeholder="Amount" ref={(input) => this._price = input }/>
                    <i className="fa fa-dollar"></i>
                </p>
              </div>
            </div>

            <p className="control">
              <textarea className="textarea is-medium" placeholder="What is it for?" ref={(textarea) => this._description = textarea }/>
            </p>

            <p className="control">
              <button className="button is-success is-medium" type="Submit">
                Record
              </button>
            </p>

          </form>

          </div>
        </div>
      </div>


    )
  }

}
