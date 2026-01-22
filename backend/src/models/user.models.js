import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, //menghapus automatis whitespaces(karakter kosong / spasi)
      minLength: 5,
      maxLength: 10,
    },

    password: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
      maxLength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

//before saving any password we need to hash it
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // agar password tidak terhash setiap kali login
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
