import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ContactServices } from "./contact.service";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const contact = await ContactServices.createContact(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Your message has been sent successfully.",
    data: contact,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const contacts = await ContactServices.getAllContacts();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact messages retrieved successfully.",
    data: contacts,
  });
});

const getSingleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await ContactServices.getSingleContact(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact message retrieved successfully.",
    data: contact,
  });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const contact = await ContactServices.updateContact(id as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact message updated successfully.",
    data: contact,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await ContactServices.deleteContact(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact message deleted successfully.",
    data: null,
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteContact,
};
