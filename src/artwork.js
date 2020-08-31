export default class Ledgeit {
  constructor(date, name, statement) {
    this.date = date
    this.name = name
    this.statement = statement
  }

  setOwner(owner) {
    this._owners = [owner]
  }
}
