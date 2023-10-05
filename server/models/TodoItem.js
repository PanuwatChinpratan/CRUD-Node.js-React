import mongoose from "mongoose";
const TodoItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TodoItem", TodoItemSchema);
