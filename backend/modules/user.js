import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    phone: {
      type: String,
      trim: true
    },
    
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },

    isBlocked: {
      type: Boolean,
      default: false
    },
    isVarified: {
      type: Boolean,
      default: true
    }, 
    picture: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const User= mongoose.model("User", userSchema);
export default User;
