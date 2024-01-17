/* The code you provided is defining a user schema using the Mongoose library for MongoDB. */
/* The line `import { Schema, model } from 'mongoose';` is importing the `Schema` and `model` objects
from the `mongoose` library. These objects are used to define the schema for a MongoDB collection
and create a model based on that schema, respectively. */

//import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt';


/* The code `const userSchema = new Schema({ ... })` is defining a schema for a user object in MongoDB. */
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


/* The code `userSchema.pre('save', async function(next) { ... })` is defining a pre-save middleware
function for the user schema. This function will be executed before saving a user object to the
database. */
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
}); 

const User = model('User', userSchema);

export default User;
