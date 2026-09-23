import mongoose from "mongoose";
import httpStatus from "http-status-codes";

import { Service } from "./service.model";
import { IService } from "./service.interface";
import AppError from "../../errorHelpers/appError";

const createService = async (payload: Partial<IService>) => {
  const existingService = await Service.findOne({
    title: payload.title,
  });

  if (existingService) {
    throw new AppError(httpStatus.CONFLICT, "Service already exists.");
  }

  const service = await Service.create(payload);

  return service;
};

const getAllServices = async () => {
  const services = await Service.find().sort({
    isFeatured: -1,
    createdAt: -1,
  });

  return services;
};

const getSingleService = async (serviceId: string) => {
  if (!mongoose.isValidObjectId(serviceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid service id.");
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  return service;
};

const updateService = async (serviceId: string, payload: Partial<IService>) => {
  if (!mongoose.isValidObjectId(serviceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid service id.");
  }

  const service = await Service.findById(serviceId);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  if (payload.title) {
    const existingService = await Service.findOne({
      title: payload.title,
      _id: { $ne: serviceId },
    });

    if (existingService) {
      throw new AppError(httpStatus.CONFLICT, "Service already exists.");
    }
  }

  const updatedService = await Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedService;
};

const deleteService = async (serviceId: string) => {
  if (!mongoose.isValidObjectId(serviceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid service id.");
  }

  const deletedService = await Service.findByIdAndDelete(serviceId);

  if (!deletedService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }
};

export const ServiceServices = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
