import mongoose from "mongoose";

const listItemSchema = new mongoose.Schema({
  name: {
    type: String
  }
});
const listSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  list: [listItemSchema]
});

listSchema.statics.findById = async function(uid) {
  // id is the same as the user's id
  const listObject = await this.findOne({ uid });
  return listObject;
};

const List = mongoose.model("List", listSchema);
const ListItem = mongoose.model("ListItem", listItemSchema);

export default List;
export { ListItem };
