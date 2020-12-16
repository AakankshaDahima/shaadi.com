import pkg from 'mongoose';
const { Schema, model } = pkg;
import pkgs from 'validator';
const { isEmail } = pkgs;
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = model('user', userSchema);

export default User;