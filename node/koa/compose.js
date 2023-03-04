function compose(middleares) {
  let index = -1;
  const dispatch = (i) => {
    const middleare = middleares[i];
    return middleare(ctx, )
  }
  return dispatch(0);
}

module.exports = compose;