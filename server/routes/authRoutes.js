import express from 'express';
import User from '../models/User.js';
import passport from '../middlewares/passport.js';
import authenticateUser from '../middlewares/authenticateUser.js';

const router = express.Router();

// Apply passport middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());

router.post('/register', authenticateUser, async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Apply passport middleware to the login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'User logged in', user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'User logged out' });
});

export default router;
