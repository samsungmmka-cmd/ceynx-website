import { PlatformPage, platformMetadata } from "@/components/platform-page";

export const metadata = platformMetadata("voice-agent");

export default function Page() {
  return <PlatformPage slug="voice-agent" />;
}
