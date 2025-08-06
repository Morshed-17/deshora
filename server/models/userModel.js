import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dlbqw7atu/image/upload/v1747734054/userImage_dhytay.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    addresses: [
      {
        street: {
          type: String,
          required: true,
        },

        city: {
          type: String,
          required: true,
        },

        country: {
          type: String,
          required: true,
        },

        postalCode: {
          type: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [],
    cart: [],
  },
  {
    timestapms: true,
  }
);

// Match encrypted password

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

const User = model("User", userSchema);

export default User;
