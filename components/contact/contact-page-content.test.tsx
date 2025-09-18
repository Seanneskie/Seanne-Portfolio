import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";

const useDataMock = vi.fn();
const saveMessageMock = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/use-data", () => ({
  useData: () => useDataMock(),
}));

vi.mock("@/lib", () => ({
  saveMessage: saveMessageMock,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean }) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children, ...props }: { children: React.ReactNode }) => <h2 {...props}>{children}</h2>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ children, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props}>{children}</input>
  ),
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props}>{children}</label>
  ),
}));

vi.mock("@/components/ui/textarea", () => ({
  Textarea: ({ children, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props}>{children}</textarea>
  ),
}));

vi.mock("lucide-react", () => ({
  Mail: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  Phone: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />, 
  Github: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />, 
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  Twitter: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

(globalThis as { React?: typeof React }).React = React;

afterEach(() => {
  vi.clearAllMocks();
  useDataMock.mockReset();
  saveMessageMock.mockClear();
});

describe("ContactPageContent", () => {
  it("renders contact information from profile data", async () => {
    useDataMock.mockReturnValue({
      data: {
        email: "hello@example.com",
        phone: "1234567890",
        socials: { linkedin: "https://linkedin.com/in/test" },
      },
      loading: false,
      error: null,
    });

    const { default: ContactPageContent } = await import("./contact-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ContactPageContent />);
    });

    expect(container.querySelector("a[href='mailto:hello@example.com']")).not.toBeNull();
    expect(container.querySelector("a[href='https://linkedin.com/in/test']")).not.toBeNull();

    root.unmount();
    container.remove();
  });

  it("submits the form and shows a success message", async () => {
    useDataMock.mockReturnValue({
      data: {
        email: "hello@example.com",
        phone: "1234567890",
      },
      loading: false,
      error: null,
    });

    const { default: ContactPageContent } = await import("./contact-page-content");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<ContactPageContent />);
    });

    const nameInput = container.querySelector("input#name") as HTMLInputElement;
    const emailInput = container.querySelector("input#email") as HTMLInputElement;
    const messageInput = container.querySelector("textarea#message") as HTMLTextAreaElement;
    const form = container.querySelector("form");

    nameInput.value = "Ada";
    emailInput.value = "ada@example.com";
    messageInput.value = "Hello";

    await act(async () => {
      form?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(saveMessageMock).toHaveBeenCalledWith({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello",
    });

    await act(async () => {});

    expect(container.textContent).toContain("Thanks for your message!");

    root.unmount();
    container.remove();
  });
});
