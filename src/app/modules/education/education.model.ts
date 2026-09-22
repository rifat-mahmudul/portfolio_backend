import { model, Schema } from "mongoose";
import { IEducation } from "./education.interface";

const educationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    institutionLogo: {
      type: String,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    isCurrent: {
      type: Boolean,
      required: true,
      default: false,
    },

    description: {
      type: String,
      trim: true,
    },

    achievements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Education = model<IEducation>("Education", educationSchema);
