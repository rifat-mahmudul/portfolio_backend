import { model, Schema } from "mongoose";
import { BlogStatus, IBlog, IBlogSection } from "./blog.interface";
import { generateSlug } from "../../utils/slug";

const blogSectionSchema = new Schema<IBlogSection>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
    timestamps: false,
  },
);

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    sections: {
      type: [blogSectionSchema],
      required: true,
      default: [],
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },

    tags: {
      type: [String],
      required: true,
      default: [],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(BlogStatus),
      default: BlogStatus.DRAFT,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    readingTime: {
      type: Number,
      default: 1,
      min: 1,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    seoTitle: {
      type: String,
      trim: true,
    },

    seoDescription: {
      type: String,
      trim: true,
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    canonicalUrl: {
      type: String,
      trim: true,
    },

    ogImage: {
      type: String,
      trim: true,
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre("validate", function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});

export const Blog = model<IBlog>("Blog", blogSchema);
