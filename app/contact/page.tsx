"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveMessage } from "@/lib";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";
    await saveMessage({ name, email, message });
    setSubmitted(true);
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact</h1>
      {submitted ? (
        <p>Thanks for your message!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required />
          </div>
          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      )}
    </main>
  );
}

