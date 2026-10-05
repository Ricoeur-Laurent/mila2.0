import type { Metadata } from "next";

import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Professionnels",
  description:
    "Communication, événementiel et accompagnement créatif pour les entreprises.",
  alternates: { canonical: "/professionnels" },
};

export default function ProfessionnelsPage() {
  return (
    <PagePlaceholder
      eyebrow="/01 · Pour les entreprises"
      title="Professionnels"
      intro="Communication, événementiel et accompagnement créatif pour les entreprises."
      sections={[
        { id: "communication", title: "Communication" },
        { id: "evenementiel", title: "Événementiel" },
        { id: "accompagnement", title: "Accompagnement créatif" },
      ]}
    />
  );
}
