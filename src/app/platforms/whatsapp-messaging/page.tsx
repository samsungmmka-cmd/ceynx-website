import { PlatformPage, platformMetadata } from "@/components/platform-page";

export const metadata = platformMetadata("whatsapp-messaging");

export default function Page() {
  return <PlatformPage slug="whatsapp-messaging" />;
}
