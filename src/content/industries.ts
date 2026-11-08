import type { IconName } from "@/components/icon";

/** TODO(CEYNX): adjust to your real client base. */
export const industries: {
  id: string;
  name: string;
  icon: IconName;
  challenge: string;
  solutions: { label: string; href: string }[];
}[] = [
  {
    id: "retail",
    name: "Retail & e-commerce",
    icon: "cart",
    challenge: "High enquiry volumes, abandoned carts and order questions that pile up across channels.",
    solutions: [
      { label: "WhatsApp campaigns and order updates", href: "/platforms/whatsapp-messaging" },
      { label: "AI agents for product questions", href: "/solutions/ai-agents" },
    ],
  },
  {
    id: "real-estate",
    name: "Real estate",
    icon: "building",
    challenge: "Leads that go cold because nobody replied fast enough, and paperwork for every deal.",
    solutions: [
      { label: "Instant WhatsApp replies to enquiries", href: "/platforms/whatsapp-messaging" },
      { label: "Lead-qualifying AI agents", href: "/solutions/ai-agents" },
      { label: "Contract and ID document extraction", href: "/platforms/document-ai" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & clinics",
    icon: "health",
    challenge: "Phones ringing during consultations, missed appointments and manual patient forms.",
    solutions: [
      { label: "24/7 AI booking by phone", href: "/platforms/voice-agent" },
      { label: "WhatsApp appointment reminders", href: "/platforms/whatsapp-messaging" },
    ],
  },
  {
    id: "education",
    name: "Education & training",
    icon: "school",
    challenge: "Complex topics that are hard to teach from slides, and training that needs real equipment.",
    solutions: [
      { label: "Interactive 3D lessons and simulations", href: "/platforms/3d-learning" },
      { label: "Custom learning platforms", href: "/solutions/custom-software" },
    ],
  },
  {
    id: "finance-legal",
    name: "Finance & legal",
    icon: "scale",
    challenge: "Teams buried in invoices, statements and contracts that must be read and checked by hand.",
    solutions: [
      { label: "AI document extraction and review", href: "/platforms/document-ai" },
      { label: "Workflow automation into your systems", href: "/solutions/ai-agents" },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: "hotel",
    challenge: "Guests expecting instant answers and bookings at any hour, in several languages.",
    solutions: [
      { label: "AI voice agent for reservations", href: "/platforms/voice-agent" },
      { label: "WhatsApp guest messaging", href: "/platforms/whatsapp-messaging" },
    ],
  },
];
