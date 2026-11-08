import { PlatformPage, platformMetadata } from "@/components/platform-page";

export const metadata = platformMetadata("document-ai");

export default function Page() {
  return <PlatformPage slug="document-ai" />;
}
