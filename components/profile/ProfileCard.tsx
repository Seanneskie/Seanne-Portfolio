"use client";

import type { ProfileData } from "./types";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import ProfileCardContent from "./ProfileCardContent";

type Props = { profile?: ProfileData | null };

export default function ProfileCard({ profile }: Props) {
  if (!profile) {
    return <ProfileCardSkeleton />;
  }
  return <ProfileCardContent profile={profile} />;
}

