import type { Metadata } from "next";

import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez M.ila Creative Lab et sa façon de créer des expériences qui ont du sens.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <PagePlaceholder
      eyebrow="/03 · M.ila"
      title="À propos"
      intro="L'art de créer des expériences qui ont du sens."
    />
  );
}
