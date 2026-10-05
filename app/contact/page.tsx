import type { Metadata } from "next";

import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de votre projet, professionnel ou personnel.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="/04 · Contact"
      title="Parlons de votre projet"
      intro="Une idée, un événement, un moment à préparer ? Le formulaire arrive bientôt."
    />
  );
}
