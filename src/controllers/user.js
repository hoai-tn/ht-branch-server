const signIn = (req, res) => {
  res.send('hi there');
};
const signUp = (req, res) => {
    res.send('sign up');
  };
module.exports = {
  signIn,
  signUp
};
