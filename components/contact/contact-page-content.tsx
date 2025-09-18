"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Phone, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveMessage } from "@/lib";
import { useData } from "@/lib/use-data";

interface ContactInfo {
  email: string;
  phone: string;
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export default function ContactPageContent(): JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const { data: profile } = useData<ContactInfo>("profile.json");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
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
      {profile ? (
        <section aria-labelledby="contact-info" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle id="contact-info">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal-600" aria-hidden="true" />
                <Button asChild variant="link" className="h-auto p-0 text-teal-600">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-teal-600" aria-hidden="true" />
                <Button asChild variant="link" className="h-auto p-0 text-teal-600">
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </Button>
              </div>
              <div className="flex items-center gap-2" role="group" aria-label="Social links">
                {profile.socials?.linkedin ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-500/20"
                  >
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {profile.socials?.github ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-500/20"
                  >
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
                {profile.socials?.twitter ? (
                  <Button
                    asChild
                    variant="outline"
                    className="border-teal-600 text-teal-600 hover:bg-teal-500/20"
                  >
                    <a
                      href={profile.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}
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
