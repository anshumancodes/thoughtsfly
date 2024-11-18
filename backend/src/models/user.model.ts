import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
