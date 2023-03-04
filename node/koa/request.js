module.exports = {
  get method(){
    return this.req.method;
  },
  set method(val) {
    return this.req.method = val;
  }
}