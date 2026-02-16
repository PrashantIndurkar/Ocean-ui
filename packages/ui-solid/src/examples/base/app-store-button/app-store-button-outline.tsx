import { AppStoreButton } from "../../../components/base/app-store-button";
import { GooglePlayIcon } from "../../../components/icons/google-play-icon";
import { AppStoreIcon } from "../../../components/icons/app-store-icon";

export default function AppStoreButtonOutline() {
  return (
    <div class="flex flex-col gap-6">
      {/* Google Play Buttons - Two sizes */}
      <div class="flex flex-wrap items-center gap-4">
        <AppStoreButton
          icon={<GooglePlayIcon />}
          topText="GET IT ON"
          bottomText="Google Play"
          href="https://play.google.com"
          variant="outline"
          size="lg"
        />
        <AppStoreButton
          icon={<GooglePlayIcon />}
          topText="GET IT ON"
          bottomText="Google Play"
          href="https://play.google.com"
          variant="outline"
          size="md"
        />
      </div>

      {/* App Store Buttons - Two sizes */}
      <div class="flex flex-wrap items-center gap-4">
        <AppStoreButton
          icon={<AppStoreIcon />}
          topText="Download on the"
          bottomText="App Store"
          href="https://apps.apple.com"
          variant="outline"
          size="lg"
        />
        <AppStoreButton
          icon={<AppStoreIcon />}
          topText="Download on the"
          bottomText="App Store"
          href="https://apps.apple.com"
          variant="outline"
          size="md"
        />
      </div>
    </div>
  );
}
