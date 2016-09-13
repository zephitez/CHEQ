export default class BaseModel {
  constructor() {
    this.baseUrl = `http://localhost:3000`
    this.baseRoute = ''
  }
  getAll() {
    return fetch(`${this.baseUrl}/${this.baseRoute}`, {method: 'GET'})
      .then(result => result.json())
  }
  create() {
    return fetch(`${this.baseUrl}/${this.baseRoute}/new`, {method: 'POST', body: this.data})
      .then(result => result.json())
  }
  get(id) {

  }
}
