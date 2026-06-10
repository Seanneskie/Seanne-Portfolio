"use client";

import type { JSX } from "react";
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
    <main className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Let us build something together
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share project details, timelines, or quick questions. I respond to serious
            inquiries and collaboration ideas.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            {profile ? (
              <section aria-labelledby="contact-info">
                <Card className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle id="contact-info">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-0">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      <Button asChild variant="link" className="h-auto p-0">
                        <a href={`mailto:${profile.email}`}>{profile.email}</a>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      <Button asChild variant="link" className="h-auto p-0">
                        <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2" role="group" aria-label="Social links">
                      {profile.socials?.linkedin ? (
                        <Button asChild variant="outline" size="icon">
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
                        <Button asChild variant="outline" size="icon">
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
                        <Button asChild variant="outline" size="icon">
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
          </div>

          <Card className="p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {submitted ? (
                <div className="rounded-card border border-gray-200 bg-slate-50 p-6 text-center text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Thanks for your message!
                  </p>
                  <p className="mt-2 text-sm">I will get back to you as soon as possible.</p>
                </div>
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
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
