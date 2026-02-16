"use client";

import { AppStoreButton } from "@/components/library/react";
import { GooglePlayIcon } from "@/components/icons/google-play-icon";
import { AppStoreIcon } from "@/components/icons/app-store-icon";

export default function AppStoreButtonLarge() {
  return (
    <div className="flex flex-wrap gap-4">
      <AppStoreButton
        icon={<GooglePlayIcon />}
        topText="GET IT ON"
        bottomText="Google Play"
        href="https://play.google.com"
        variant="default"
        size="lg"
      />
      <AppStoreButton
        icon={<AppStoreIcon />}
        topText="Download on the"
        bottomText="App Store"
        href="https://apps.apple.com"
        variant="default"
        size="lg"
      />
    </div>
  );
}
