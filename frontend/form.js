import React from 'react';
import User from './models/User'
import Transaction from './models/Transaction'
import Friend from './models/Friend'

export default class Form extends React.Component{
  constructor() {
    super()
    this.state = {
      friendlist: []
    }
  }

  _getFriends(){
    const friends = new Friend();

    friends.getAllFriends().then(data => {
      this.setState({
        friendlist: data
      })
    })
    .catch(error => console.log(error))
  }

  _displayFriends(){
    let outputFriend = this.state.friendlist.map( (friend) => {
      return (
        <option>{friend}</option>
      )
    })
    return outputFriend;
  }

  _postTransaction(event){
    event.preventDefault()

    const friend = this._friend.value;

    if ( this._option.value == 1 ) {
      this._price.value = -this._price.value;
    }

    const amount = this._price.value;
    const item = this._description.value;

    const data = { friend, amount, item }

    const transaction = new Transaction(data)
    transaction.create(data)
      .then(data => {
        window.location = "/dashboard/all"
      })
      .catch(error => console.log(error))

  }

  componentWillMount(){
    this._getFriends();
  }
  render(){
    return(
      <div className="columns">
        <div className="box column is-10 is-offset-1">
          <div className="column is-8 is-offset-2">

          <form onSubmit={this._postTransaction.bind(this)}>

            <h1 className="title">Record a Transaction</h1>
            <div className="control is-horizontal">
              <div className="control is-grouped">
                <p className="control has-addons is-expanded">
                  <span className="select is-medium">
                    <select ref={(input) => this._option = input}>
                      <option value="1" >Pay To</option>
                      <option value="2" >Collect From</option>
                    </select>
                  </span>
                </p>
                <p className="control has-icon">
                <span className="select is-medium">
                  <select ref={(input) => this._friend = input}>
                  <option>Select Friend</option>
                    {this._displayFriends()}
                  </select>
                  </span>
                </p>

                <p className="control has-icon is-expanded">
                    <input type="number" step="any" className="input is-medium" placeholder="Amount" ref={(input) => this._price = input }/>
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
