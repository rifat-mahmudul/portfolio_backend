import { BlogStatus } from "../blog/blog.interface";
import { Blog } from "../blog/blog.model";
import { Contact } from "../contact/contact.model";
import { Experience } from "../experience/experience.model";
import { Project } from "../project/project.model";
import { Service } from "../service/service.model";
import { Skill } from "../skill/skill.model";

const getDashboardStatistics = async () => {
  const [
    totalProjects,
    featuredProjects,
    totalBlogs,
    publishedBlogs,
    totalMessages,
    totalSkills,
    totalExperiences,
    totalServices,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Blog.countDocuments(),
    Blog.countDocuments({ status: BlogStatus.PUBLISHED }),
    Contact.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Service.countDocuments(),
  ]);

  return {
    projects: totalProjects,
    featuredProjects,
    blogs: totalBlogs,
    publishedBlogs,
    messages: totalMessages,
    skills: totalSkills,
    experiences: totalExperiences,
    services: totalServices,
  };
};

export const DashboardServices = {
  getDashboardStatistics,
};
