import React from 'react';
import User from './models/User'

export default class Form extends React.Component{
  constructor() {
    super()
    this.state = {
      text: 'hi'
    }
  }

  render(){
    return(
      <div className="columns">
        <div className="box column is-10 is-offset-1">
          <div className="column is-8 is-offset-2">

          <form action="" method="post" onSubmit={this._handleSubmit.bind(this)}>

            <h1 className="title">Record a Transaction</h1>
            <div className="control is-horizontal">
              <div className="control is-grouped">
                <p className="control has-addons is-expanded">
                  <span className="select is-medium">
                    <select>
                      <option>Pay To</option>
                      <option>Collect From</option>
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

  _handleSubmit(event){
    event.preventDefault();

    let friend = this._friend;
    let price = this._price;
    let description = this._description;

    this.props.addTransaction(friend.value, price.value, description.value);
  }

}
