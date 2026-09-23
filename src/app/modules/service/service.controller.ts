import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const service = await ServiceServices.createService(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Service created successfully.",
    data: service,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const services = await ServiceServices.getAllServices();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully.",
    data: services,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const service = await ServiceServices.getSingleService(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service retrieved successfully.",
    data: service,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const service = await ServiceServices.updateService(id as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated successfully.",
    data: service,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await ServiceServices.deleteService(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service deleted successfully.",
    data: null,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
