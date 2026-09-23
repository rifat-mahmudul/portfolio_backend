import { model, Schema } from "mongoose";
import { IBlogCategory } from "./blogCategory.interface";

const blogCategorySchema = new Schema<IBlogCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogCategory = model<IBlogCategory>(
  "BlogCategory",
  blogCategorySchema,
);
