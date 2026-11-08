import { company } from "@/content/llms";

/**
 * /llms.txt — a plain-text summary of CEYNX for AI assistants and developer tools
 * (https://llmstxt.org). Prerendered at build time from the site content.
 */
export function GET() {
  return new Response(company(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
