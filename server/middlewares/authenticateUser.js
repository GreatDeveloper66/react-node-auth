const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);

const validateUser = (user) => {
  const { email, password } = user;
  return validateEmail(email) && validatePassword(password);
};

const authenticateUser = (req, res, next) => {
  if (validateUser(req.body)) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid user' });
  }
};

export default authenticateUser;
