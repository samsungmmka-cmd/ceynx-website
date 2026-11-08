import { SolutionPage, solutionMetadata } from "@/components/solution-page";

export const metadata = solutionMetadata("custom-software");

export default function Page() {
  return <SolutionPage slug="custom-software" />;
}
