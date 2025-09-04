export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  position?: string;
  salaryRange?: string;
  company?: string;
  recruiterContact?: string;
  date: string;
};

const messages: ContactMessage[] = [];

export async function saveMessage(message: Omit<ContactMessage, "date">) {
  messages.push({ ...message, date: new Date().toISOString() });
}

export function getMessages() {
  return messages;
}

