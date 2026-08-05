import type { Metadata } from "next";
import FluidFlowGrid from "@/components/ui/fluid-flow-grid";

// Component sandbox, not brand content — keep it out of search and AI answers.
export const metadata: Metadata = {
  title: "Component demo",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/demo" },
};

export default function DemoOne() {
  return <FluidFlowGrid />;
}
