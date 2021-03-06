export default class BaseModel {
  constructor() {
    this.baseUrl = `http://cheq.herokuapp.com`
    this.baseRoute = ''
    this.headers = new Headers({
      userId: window.localStorage.getItem('userId'),
      "Content-Type": "application/json"
    });
  }
  getAll() {
    return fetch(`${this.baseUrl}/${this.baseRoute}`, {method: 'GET', headers: this.headers})
      .then(result => result.json())
  }
  create() {
    return fetch(`${this.baseUrl}/${this.baseRoute}/new`, {method: 'POST', body: this.data, headers: this.headers})
      .then(result => result.json())
  }
  getAllFriends() {
    return fetch(`${this.baseUrl}/${this.baseRoute}`, {method: 'GET', headers: this.headers})
      .then(result => result.json())
  }
}
