import BaseModel from './BaseModel'

export default class Friend extends BaseModel {
  constructor(data){
    super();
    this.baseRoute = 'getfriends';
    this.data = JSON.stringify(data)
  }
}
