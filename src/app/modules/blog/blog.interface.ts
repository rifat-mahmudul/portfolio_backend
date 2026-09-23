import { Types } from "mongoose";

export enum BlogStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface IBlogSection {
  title: string;
  content: string;
}

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  sections: IBlogSection[];
  thumbnail: string;
  category: Types.ObjectId;
  tags: string[];
  author: Types.ObjectId;
  status: BlogStatus;
  featured: boolean;
  readingTime: number;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
