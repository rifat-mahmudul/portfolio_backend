import mongoose from "mongoose";
import httpStatus from "http-status-codes";

import { Contact } from "./contact.model";
import { IContact } from "./contact.interface";
import AppError from "../../errorHelpers/appError";
import { sendEmail } from "../../utils/sendEmail";
import { envVars } from "../../config/env";

const createContact = async (payload: Partial<IContact>) => {
  const contact = await Contact.create(payload);

  await sendEmail({
    to: envVars.EMAIL_SENDER.SMTP_USER,
    subject: `New Contact Message: ${contact.subject}`,
    templateName: "contactMessage",
    templateData: {
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    },
    replyTo: contact.email,
  });

  return contact;
};

const getAllContacts = async () => {
  const contacts = await Contact.find().sort({
    createdAt: -1,
  });

  return contacts;
};

const getSingleContact = async (contactId: string) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid contact id.");
  }

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found.");
  }

  return contact;
};

const updateContact = async (contactId: string, payload: Partial<IContact>) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid contact id.");
  }

  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found.");
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedContact;
};

const deleteContact = async (contactId: string) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid contact id.");
  }

  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found.");
  }
};

export const ContactServices = {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteContact,
};
