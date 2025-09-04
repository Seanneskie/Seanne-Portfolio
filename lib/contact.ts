export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  date: string;
};

const messages: ContactMessage[] = [];

export async function saveMessage(data: Omit<ContactMessage, "date">) {
  messages.push({ ...data, date: new Date().toISOString() });
}

export function getMessages() {
  return messages;
}

