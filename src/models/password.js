import mongoose from "mongoose";

const userPasswordSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  password: {
    type: String
  }
});

userPasswordSchema.statics.findByUid = async function(uid) {
  return await this.findOne({ uid });
};

const UserPassword = mongoose.model("UserPassword", userPasswordSchema);
export default UserPassword;
