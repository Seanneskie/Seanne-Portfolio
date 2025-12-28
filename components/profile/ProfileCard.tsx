"use client";

import { type ReactElement } from "react";
import type { ProfileData } from "./types";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import ProfileCardContent from "./ProfileCardContent";

type Props = { profile?: ProfileData | null; imagePriority?: boolean };

export default function ProfileCard({ profile, imagePriority = false }: Props): ReactElement {
  if (!profile) {
    return <ProfileCardSkeleton />;
  }
  return <ProfileCardContent profile={profile} imagePriority={imagePriority} />;
}

