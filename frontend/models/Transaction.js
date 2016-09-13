import BaseModel from './BaseModel'

export default class Transaction extends BaseModel {
  constructor(data){
    super()
    this.baseRoute = 'transaction'
    this.data = data
  }
}
