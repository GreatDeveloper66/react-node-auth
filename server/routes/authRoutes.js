import express, { application } from 'express';
import User from '../models/User.js';
import passport from '../middlewares/passport.js';
import { authenticateLogin, isAuthenticated } from '../middlewares/userAuthentications.js';

const router = express.Router();

// Apply passport middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());




/* The code `router.post('/register', authenticateLogin, async (req, res) => { ... })` defines a route
handler for the POST request to the '/register' endpoint. */
router.post('/register', authenticateLogin, async (req, res) => {
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

/* The code `router.get('/user/:id', isAuthenticated, async (req, res) => { ... })` defines a route
handler for the GET request to the '/user/:id' endpoint. */
router.get('/user/:id', isAuthenticated, async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/* The code `router.post('/logout', (req, res, next) => { ... })` defines a route handler for the POST
request to the '/logout' endpoint. */
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      next(err);
    }
    res.status(200).json({ message: 'User logged out' });
  });

});

router.delete('/user/:id', isAuthenticated, async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted', user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.patch('/user/:id', isAuthenticated, async (req, res) => {
  try {
    if(req.isAuthenticated()) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if(!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated', user });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
})

export default router;
