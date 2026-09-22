import { model, Schema } from "mongoose";
import { IProject } from "./project.interface";
import { generateSlug } from "../../utils/slug";

const projectSectionSchema = new Schema(
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

const projectSchema = new Schema<IProject>(
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

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    sections: {
      type: [projectSectionSchema],
      required: true,
      default: [],
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      required: true,
      default: [],
    },

    category: {
      type: String,
      trim: true,
    },

    liveUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      frontend: {
        type: String,
        trim: true,
      },

      backend: {
        type: String,
        trim: true,
      },
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.pre("validate", function () {
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }
});

export const Project = model<IProject>("Project", projectSchema);
