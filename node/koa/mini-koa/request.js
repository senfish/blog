module.exports = {
  get method(){
    return this.req.method;
  },
  set method(val) {
    return this.req.method = val;
  },
  get url () {
    return this.req.url
  },
  set url (val) {
    this.req.url = val
  },
}