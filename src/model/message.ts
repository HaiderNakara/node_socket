import { model, Schema } from "mongoose";
const messageSchema = new Schema(
  {
    message: {
      type: String,
    },
    member: [String],
  }
  // {
  //   timestamps: true,
  // }
);
export const Message = model("Message", messageSchema);
