import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    favoriteColor: {
      type: String,
      trim: true
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required']
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
