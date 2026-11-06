import type { IconName } from "@/components/icon";

/**
 * SaaS platform content. Product names are working names from the blueprint.
 * TODO(CEYNX): confirm names and mark any unreleased feature with `soon: true`.
 */
export type Platform = {
  slug: "whatsapp-messaging" | "document-ai" | "voice-agent" | "3d-learning";
  name: string;
  category: string;
  icon: IconName;
  accent: string;
  headline: string;
  promise: string;
  summary: string;
  builtFor: string[];
  problems: { title: string; text: string }[];
  features: { title: string; text: string; icon: IconName; soon?: boolean }[];
  steps: { title: string; text: string }[];
  useCases: { industry: string; text: string }[];
  integrations: string[];
  security: string[];
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string; keyword: string };
};

export const platforms: Platform[] = [
  {
    slug: "whatsapp-messaging",
    name: "CEYNX Connect",
    category: "WhatsApp messaging platform",
    icon: "chat",
    accent: "var(--c-acc-1)",
    headline: "Turn WhatsApp into your best sales and support channel.",
    promise: "Reach, engage and support customers at scale on the app they already use.",
    summary:
      "A cloud-based SaaS platform for running campaigns, team conversations and AI-assisted replies on WhatsApp, built on the official WhatsApp Business Platform.",
    builtFor: ["Retail", "Real estate", "Clinics", "Service businesses"],
    problems: [
      { title: "Messages slip through", text: "Customer chats sit on personal phones where nobody else can see or answer them." },
      { title: "Campaigns are manual", text: "Broadcasting offers one contact at a time wastes hours and risks your number being flagged." },
      { title: "No visibility", text: "You cannot tell which messages were delivered, read or turned into sales." },
    ],
    features: [
      { title: "Bulk campaigns", text: "Send approved template messages to segmented audiences and schedule them in advance.", icon: "rocket" },
      { title: "Shared team inbox", text: "Every conversation in one place, assigned to the right person, with internal notes.", icon: "users" },
      { title: "AI auto-replies and chatbots", text: "Answer common questions instantly and hand complex chats to your team.", icon: "agent" },
      { title: "Contact segmentation", text: "Tag and filter contacts by interest, stage or location for relevant messaging.", icon: "layers" },
      { title: "CRM integration", text: "Sync contacts and conversations with the tools your team already uses.", icon: "plug" },
      { title: "Delivery and read analytics", text: "Track sent, delivered, read and replied rates for every campaign.", icon: "chart" },
    ],
    steps: [
      { title: "Sign up", text: "Create your workspace and connect your WhatsApp Business number." },
      { title: "Configure", text: "Import contacts, set up templates, teams and automated replies." },
      { title: "Go live", text: "Launch campaigns and manage every conversation from one inbox." },
    ],
    useCases: [
      { industry: "Retail & e-commerce", text: "Order updates, abandoned-cart reminders and product launches." },
      { industry: "Real estate", text: "Instant replies to property enquiries and viewing reminders." },
      { industry: "Healthcare & clinics", text: "Appointment confirmations and follow-up messages." },
    ],
    integrations: ["CRM systems", "E-commerce stores", "Helpdesk tools", "Spreadsheets", "Webhooks & REST API"],
    security: ["Built on the official WhatsApp Business Platform", "Role-based team access", "Encrypted data in transit and at rest", "Opt-in and opt-out management"],
    faqs: [
      { q: "Do I need a WhatsApp Business account?", a: "Yes. We help you set up access to the WhatsApp Business Platform and connect your number during onboarding." },
      { q: "Can several team members use the same number?", a: "Yes. The shared inbox lets your whole team reply from one business number, with conversations assigned to individuals." },
      { q: "Will bulk messages get my number blocked?", a: "Campaigns use pre-approved templates sent only to contacts who opted in, which follows WhatsApp's rules and protects your number's quality rating." },
      { q: "Can the AI reply in Arabic as well as English?", a: "Auto-replies can be configured in the languages your customers use. Tell us which languages you need during setup." },
      { q: "How is pricing calculated?", a: "You pay a SaaS subscription for the platform plus WhatsApp's own conversation fees. We share a quote based on your volume." },
    ],
    seo: {
      title: "WhatsApp Business Messaging Platform",
      description: "CEYNX Connect is a SaaS platform for WhatsApp campaigns, a shared team inbox, AI auto-replies and analytics.",
      keyword: "WhatsApp business messaging platform",
    },
  },
  {
    slug: "document-ai",
    name: "CEYNX DocSense",
    category: "AI document analysis platform",
    icon: "document",
    accent: "var(--c-acc-2)",
    headline: "Read a thousand documents in the time it takes to read one.",
    promise: "Extract, summarise and validate data from any document automatically.",
    summary:
      "A SaaS platform that uses AI to read PDFs, scans and images, pull out the data you need and send it straight to your systems.",
    builtFor: ["Finance", "Legal", "HR", "Insurance", "Logistics"],
    problems: [
      { title: "Manual data entry", text: "Teams retype invoices, forms and contracts line by line, introducing errors." },
      { title: "Slow turnaround", text: "Approvals wait days because someone has to read and check every document." },
      { title: "Knowledge locked in files", text: "Answers hide in hundreds of pages that nobody has time to search." },
    ],
    features: [
      { title: "Upload any format", text: "PDFs, scans, photos and Office files, one at a time or in bulk.", icon: "document" },
      { title: "OCR for scans", text: "Turn scanned and photographed pages into searchable, machine-readable text.", icon: "search" },
      { title: "Field extraction", text: "Pull names, dates, amounts and line items into structured data.", icon: "layers" },
      { title: "Summaries", text: "Get the key points of long reports and contracts in seconds.", icon: "spark" },
      { title: "Ask the document", text: "Ask questions in plain language and get answers with the source page.", icon: "chat" },
      { title: "Export to your systems", text: "Send results to spreadsheets, ERPs and databases via export or API.", icon: "api" },
    ],
    steps: [
      { title: "Sign up", text: "Create your workspace and choose the document types you handle." },
      { title: "Configure", text: "Define the fields to extract and the validation rules to apply." },
      { title: "Go live", text: "Upload documents or connect an inbox, then review and export results." },
    ],
    useCases: [
      { industry: "Finance", text: "Invoice and receipt processing, bank statement analysis." },
      { industry: "Legal", text: "Contract review, clause search and summaries." },
      { industry: "HR", text: "CV screening and employee document checks." },
    ],
    integrations: ["Spreadsheets", "ERP and accounting systems", "Cloud storage", "Email inboxes", "Webhooks & REST API"],
    security: ["Encrypted storage and transfer", "Configurable data retention", "Role-based access controls", "Audit trail of every extraction"],
    faqs: [
      { q: "Which document types are supported?", a: "PDFs, scanned images (JPG, PNG, TIFF) and common Office formats. Handwriting support depends on legibility." },
      { q: "How accurate is the extraction?", a: "Accuracy depends on document quality and layout. Every result shows a confidence level, and low-confidence fields can be routed for human review." },
      { q: "Can it handle Arabic documents?", a: "Multilingual support is available. Share sample documents and we will confirm results for your languages before you commit." },
      { q: "Is our data used to train AI models?", a: "No. Your documents are processed for your workspace only and are not used to train shared models." },
      { q: "Can it connect to our existing system?", a: "Yes. Results can be exported or pushed to your systems through the API and webhooks." },
    ],
    seo: {
      title: "AI Document Analysis Platform",
      description: "CEYNX DocSense uses AI to extract data, summarise and answer questions from PDFs, scans and images.",
      keyword: "AI document analysis",
    },
  },
  {
    slug: "voice-agent",
    name: "CEYNX Voice",
    category: "AI customer support voice agent",
    icon: "voice",
    accent: "var(--c-acc-3)",
    headline: "Every call answered. Day and night.",
    promise: "A natural-sounding AI voice agent that resolves customer calls 24/7.",
    summary:
      "A SaaS voice agent that answers and makes calls, understands natural speech, books appointments and hands over to your team when a person is needed.",
    builtFor: ["Contact centres", "Clinics", "Hospitality", "Utilities"],
    problems: [
      { title: "Missed calls, lost customers", text: "Calls after hours or during peak times go unanswered and customers call a competitor." },
      { title: "Repetitive questions", text: "Agents spend most of the day answering the same opening hours, prices and status questions." },
      { title: "High staffing cost", text: "Covering every hour of the week with people is expensive and hard to scale." },
    ],
    features: [
      { title: "Inbound and outbound calls", text: "Answer incoming calls and run reminder or follow-up campaigns.", icon: "phone" },
      { title: "Natural conversation", text: "Understands everyday speech and responds in a clear, human-like voice.", icon: "voice" },
      { title: "Appointment booking", text: "Checks availability and books, moves or cancels appointments in your calendar.", icon: "clock" },
      { title: "Human hand-off", text: "Transfers the call to the right person with a summary of the conversation.", icon: "users" },
      { title: "Transcripts and summaries", text: "Every call is transcribed and summarised for your records.", icon: "document" },
      { title: "Call analytics", text: "See call volume, resolution rate, common topics and peak times.", icon: "chart" },
    ],
    steps: [
      { title: "Sign up", text: "Create your workspace and connect a phone number." },
      { title: "Configure", text: "Add your FAQs, booking rules, voice and transfer options." },
      { title: "Go live", text: "Route calls to the agent and monitor every conversation from the dashboard." },
    ],
    useCases: [
      { industry: "Healthcare & clinics", text: "Appointment booking and reminders around the clock." },
      { industry: "Hospitality", text: "Reservations and guest questions in any time zone." },
      { industry: "Utilities & services", text: "Outage updates, account questions and service requests." },
    ],
    integrations: ["Phone systems (SIP)", "Calendars", "CRM systems", "Helpdesk tools", "Webhooks & REST API"],
    security: ["Encrypted call recordings and transcripts", "Configurable recording consent message", "Role-based access", "Data retention controls"],
    faqs: [
      { q: "Will callers know they are speaking to AI?", a: "We recommend telling callers at the start of the call. The greeting is fully configurable to meet your policies and local regulations." },
      { q: "Can I keep my existing phone number?", a: "Usually yes. Calls can be forwarded to the agent or connected through your phone system." },
      { q: "What happens when the AI cannot help?", a: "It transfers the caller to a team member or takes a message, and passes on a summary so the caller does not repeat themselves." },
      { q: "Which languages does it speak?", a: "Tell us which languages and accents your callers use, and we will confirm the voices available for your setup." },
      { q: "How quickly can we go live?", a: "A standard setup with your FAQs and booking rules can go live in days. Complex integrations take longer." },
    ],
    seo: {
      title: "AI Voice Agent for Customer Support",
      description: "CEYNX Voice is an AI voice agent that answers calls 24/7, books appointments and hands off to your team.",
      keyword: "AI voice agent for customer support",
    },
  },
  {
    slug: "3d-learning",
    name: "CEYNX Learn 3D",
    category: "3D learning platform",
    icon: "cube",
    accent: "var(--c-acc-4)",
    headline: "Learning people can see, touch and explore.",
    promise: "Interactive 3D lessons and simulations that make complex topics easy to grasp.",
    summary:
      "A browser-based SaaS learning platform with interactive 3D models, guided simulations and assessments, with no headset or installation required.",
    builtFor: ["Schools", "Universities", "Corporate training", "Technical training"],
    problems: [
      { title: "Abstract topics", text: "Learners struggle to picture machines, anatomy or molecules from flat diagrams." },
      { title: "Costly hands-on training", text: "Real equipment and labs are expensive, limited and sometimes unsafe for beginners." },
      { title: "Low engagement", text: "Slides and videos fail to keep learners focused or measure what they understood." },
    ],
    features: [
      { title: "Interactive 3D models", text: "Rotate, zoom and take apart models to understand how things work.", icon: "cube" },
      { title: "Guided simulations", text: "Step-by-step scenarios that let learners practise safely.", icon: "compass" },
      { title: "Quizzes", text: "Check understanding inside each lesson with instant feedback.", icon: "check" },
      { title: "Progress tracking", text: "Dashboards for teachers and trainers to follow each learner.", icon: "chart" },
      { title: "Works in the browser", text: "Runs on laptops, tablets and phones with no installation.", icon: "globe" },
      { title: "Custom content creation", text: "Our team builds 3D lessons around your own curriculum or equipment.", icon: "pen" },
    ],
    steps: [
      { title: "Sign up", text: "Create your organisation and invite teachers or trainers." },
      { title: "Configure", text: "Choose lessons from the library or request custom 3D content." },
      { title: "Go live", text: "Assign lessons to learners and track their progress." },
    ],
    useCases: [
      { industry: "Schools", text: "Science, geography and engineering lessons in 3D." },
      { industry: "Universities", text: "Virtual labs and anatomy or engineering models." },
      { industry: "Corporate training", text: "Equipment, safety and product training without downtime." },
    ],
    integrations: ["Learning management systems", "Single sign-on", "Spreadsheets", "Webhooks & REST API"],
    security: ["Role-based access for admins, trainers and learners", "Encrypted data in transit and at rest", "Privacy-conscious handling of learner data"],
    faqs: [
      { q: "Do learners need VR headsets?", a: "No. Lessons run in a normal web browser on laptops, tablets and phones." },
      { q: "Can you create 3D content for our curriculum?", a: "Yes. Our team designs custom 3D models and simulations around your subjects or equipment." },
      { q: "Can it connect to our LMS?", a: "Integration with learning management systems is available. Tell us which system you use." },
      { q: "How do teachers track progress?", a: "Dashboards show lesson completion, quiz scores and time spent for each learner and group." },
      { q: "Is there a trial?", a: "We offer guided demos and pilot programmes so you can test lessons with a group of learners first." },
    ],
    seo: {
      title: "3D Learning Platform",
      description: "CEYNX Learn 3D is a browser-based platform for interactive 3D lessons, simulations, quizzes and progress tracking.",
      keyword: "3D learning platform",
    },
  },
];

export function getPlatform(slug: Platform["slug"]) {
  const p = platforms.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown platform: ${slug}`);
  return p;
}
