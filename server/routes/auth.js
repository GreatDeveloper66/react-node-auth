const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const validateUser = (user) => validateEmail(user.email) && validatePassword(user.password);



router.get('/secure-route', (req, res) => {
  res.json({ message: 'This is a secure route' });
});

router.post('/register', (req, res) => {
  // Implement authentication logic here
    const { email, password } = req.body;
    // Validate email and password here
    const userValid = validateUser(req.body);
    if(userValid) {
        const hashedPassword = hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        // Save user to database
        newUser.save()
            .then(user => {
                res.json({user: user._id, message: 'User created successfully'});
            })
            .catch(err => {
                res.status(500).json({message: 'Unable to create user. Server malfunction'});
            });
    } else {
        res.status(400).json({message: 'Invalid user data'});
    }       
}
);


 
module.exports = router;
