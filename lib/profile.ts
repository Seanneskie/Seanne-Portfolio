import { toast } from "sonner";

export const getInitials = (name?: string) =>
  (name ?? "SC")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const openMailTo = (email: string) => {
  toast.info("Opening your email client…");
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    "Inquiry about collaboration / Hire"
  )}`;
};

export const copyEmail = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  } catch {
    toast.error("Couldn't copy email");
  }
};
