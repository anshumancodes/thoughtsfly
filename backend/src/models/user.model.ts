import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 16,
    },
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    profileBanner: {
      type: String,
      default: null, 
    },
    profileBio: {
      type: String,
      maxLength: 520,
    },
    location: {
      type: {
        type: String, 
        enum: ['Point'],
        required: false, // Not mandatory for all users
      },
      coordinates: {
        type: [Number], 
        required: false, 
      },
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add 2dsphere index to enable geospatial queries
userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password:string) {
  // Bcrypt automatically uses the salt embedded in the stored hash for the compare () method , added this comment to 
  // make sure you dont get brainfuck to think how it compares the password without the access to the salt :)
  return bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken = function () {
return jwt.sign(
  {
    _id:this._id,
    email:this.email,
    username:this.username,
    name:this.name,
  },
  process.env.JWT_SECRET_KEY,
  {
    expiresIn: '2161h',
  }
);
}


const User = mongoose.model('User', userSchema);

export default User;
