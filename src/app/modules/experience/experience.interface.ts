export interface IExperience {
  company: string;
  companyLogo: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}
