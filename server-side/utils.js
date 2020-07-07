/* js loop for doing something n times */
module.exports = times = x => f => {
  if (x > 0) {
    f();
    times (x - 1) (f)
  }
};
