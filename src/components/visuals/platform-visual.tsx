import type { Platform } from "@/content/platforms";
import { ChatMockup } from "./chat-mockup";
import { DocScan } from "./doc-scan";
import { LessonMockup } from "./lesson-mockup";
import { VoiceCall } from "./voice-call";

/** The signature visual for each SaaS platform. */
export function PlatformVisual({ slug, className = "" }: { slug: Platform["slug"]; className?: string }) {
  switch (slug) {
    case "whatsapp-messaging":
      return <ChatMockup className={className} />;
    case "document-ai":
      return <DocScan className={className} />;
    case "voice-agent":
      return <VoiceCall className={className} />;
    case "3d-learning":
      return <LessonMockup className={className} />;
  }
}
