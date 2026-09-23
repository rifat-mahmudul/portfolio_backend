import { model, Schema } from "mongoose";
import { IContact, MessageStatus } from "./contact.interface";

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.UNREAD,
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = model<IContact>("Contact", contactSchema);
