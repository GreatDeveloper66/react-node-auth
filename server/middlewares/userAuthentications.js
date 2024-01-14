import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'A&&**^%$#@@!@#$%^&*()_+';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);

const validateUser = (user) => {
  const { email, password } = user;
  const validationErrors = [];
  if(!validateEmail(email)) {
    validationErrors.push('Invalid email');
  }

  if(!validatePassword(password)) {
    validationErrors.push('Invalid password');
  } 
  return validationErrors.length === 0 ? true : { error: "Invalid user", details: validationErrors };
  
};

const authenticateLogin = (req, res, next) => {
  if (validateUser(req.body)) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid user' });
  }
};

const isAuthenticated = (req, res, next) => {
  try {
    if(req.method === 'OPTIONS') {
      return next();
    }
    let token = req.headers.authorization;
    if(!token) {
      return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
    } else {
      token = token.split(' ')[1];
      jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
          return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
        } else {
          req.userId = decoded.userId;
          next();
        }
      }); 

    }
  }
  catch(error) {
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}


export { authenticateLogin, isAuthenticated };
