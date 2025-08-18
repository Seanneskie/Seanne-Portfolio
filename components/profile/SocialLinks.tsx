"use client";

import { Facebook, Twitter, Linkedin, Github, FileText, Code } from "lucide-react";
import SocialIcon from "./SocialIcon";
import type { Links } from "./types";

export default function SocialLinks({ links }: { links: Links }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SocialIcon href={links.facebook} label="Facebook">
        <Facebook size={18} />
      </SocialIcon>
      <SocialIcon href={links.twitter} label="Twitter / X">
        <Twitter size={18} />
      </SocialIcon>
      <SocialIcon href={links.linkedin} label="LinkedIn">
        <Linkedin size={18} />
      </SocialIcon>
      <SocialIcon href={links.github} label="GitHub">
        <Github size={18} />
      </SocialIcon>
      <SocialIcon href={links.leetcode} label="LeetCode">
        <Code size={18} />
      </SocialIcon>
      <SocialIcon href={links.resume} label="Download Resume">
        <FileText size={18} />
      </SocialIcon>
    </div>
  );
}
