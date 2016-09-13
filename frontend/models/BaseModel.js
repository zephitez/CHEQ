export default class BaseModel {
  constructor(route) {
    this.baseRoute = route
  }
  getAll() {
    return fetch(`http://localhost:3000/${this.baseRoute}`, {method: 'GET'})
      .then(result => result.json())
  }
  create(body) {
    fetch(`http://localhost:3000/${this.baseRoute}`, {method: 'POST', body: body})
      .then(result => result.json())
      .then(data => console.log(data))
  }
  get(id) {

  }
}
