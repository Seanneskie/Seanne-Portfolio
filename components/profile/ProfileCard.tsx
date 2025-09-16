"use client";

import { type ReactElement } from "react";
import type { ProfileData } from "./types";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import ProfileCardContent from "./ProfileCardContent";

type Props = { profile?: ProfileData | null };

export default function ProfileCard({ profile }: Props): ReactElement {
  if (!profile) {
    return <ProfileCardSkeleton />;
  }
  return <ProfileCardContent profile={profile} />;
}

