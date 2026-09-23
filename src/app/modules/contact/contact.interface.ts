export enum MessageStatus {
  UNREAD = "UNREAD",
  READ = "READ",
  REPLIED = "REPLIED",
  ARCHIVED = "ARCHIVED",
}

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
}
