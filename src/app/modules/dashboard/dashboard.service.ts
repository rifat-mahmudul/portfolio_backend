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

const getBlogAnalytics = async () => {
  const result = await Blog.aggregate([
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);

  return {
    totalViews: result[0]?.totalViews || 0,
  };
};

const getMostViewedBlogs = async () => {
  const result = await Blog.find()
    .sort({ views: -1 })
    .limit(5)
    .select("title slug views thumbnail");

  return result;
};

export const DashboardServices = {
  getDashboardStatistics,
  getBlogAnalytics,
  getMostViewedBlogs
};
