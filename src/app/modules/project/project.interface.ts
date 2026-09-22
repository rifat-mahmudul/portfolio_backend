export interface IProjectSection {
  title: string;
  content: string;
}

export interface IProject {
  title: string;
  slug: string;
  shortDescription: string;
  sections: IProjectSection[];
  thumbnail?: string;
  images?: string[];
  technologies: string[];
  category?: string;
  liveUrl?: string;
  githubUrl?: {
    frontend: string;
    backend: string;
  };
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
