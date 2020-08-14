import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

userSchema.statics.findByUsername = async function(username) {
  const user = await this.findOne({ username });
  return user;
};

userSchema.statics.findByEmail = async function(email) {
  const user = await this.findOne({ email });
  return user;
};

const User = mongoose.model("User", userSchema);
export default User;
