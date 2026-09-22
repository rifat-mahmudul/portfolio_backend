export interface IEducation {
  institution: string;
  institutionLogo?: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description?: string;
  achievements?: string[];
}