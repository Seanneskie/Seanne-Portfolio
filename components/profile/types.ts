export interface Education {
  level: string;
  institution: string;
  year: string;
}

export interface Links {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  resume?: string;
  website?: string;
}

export interface ProfileData {
  name: string;
  email: string;
  address: string;
  image: string;
  background: string;
  education: Education[];
  links: Links;
}

