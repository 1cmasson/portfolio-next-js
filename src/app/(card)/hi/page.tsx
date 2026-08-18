import { ContactCard } from "@/components/card/ContactCard";

// Nothing to fetch — render it once at build time and serve it from the edge.
export const dynamic = "force-static";

export default function HiPage() {
  return <ContactCard />;
}
