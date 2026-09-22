import { model, Schema } from "mongoose";
import { ISkill } from "./skill.interface";

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
    },

    proficiency: {
      type: Number,
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Skill = model<ISkill>("Skill", skillSchema);
