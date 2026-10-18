import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="lagoon-field grid min-h-dvh place-items-center px-4 text-center text-white">
      <div>
        <p className="font-display text-7xl font-bold text-signal">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page doesn&apos;t exist</h1>
        <p className="mt-3 text-white/70">The link may be old or mistyped.</p>
        <Button className="mt-8" asChild><Link href="/">Go to the home page</Link></Button>
      </div>
    </main>
  );
}
