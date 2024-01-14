import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
const findOne = User.findOne.bind(User);
const findById = User.findById.bind(User);

const secretKey = process.env.JWT_SECRET || 'A&&**^%$#@@!@#$%^&*()_+';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      return done(null, { user, userId: user._id, token });
    } catch (error) {
      return done(error);
    }
  })
);


export default passport;
