import type { Metadata } from "next";

import PagePlaceholder from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Particuliers",
  description: "Mariages, danse et expériences privées pensées sur mesure.",
  alternates: { canonical: "/particuliers" },
};

export default function ParticuliersPage() {
  return (
    <PagePlaceholder
      eyebrow="/02 · Pour vous & vos proches"
      title="Particuliers"
      intro="Mariages, danse et expériences privées pensées sur mesure."
      sections={[
        { id: "mariages", title: "Mariages" },
        { id: "danse", title: "Danse" },
        { id: "derniere-danse", title: "Dernière danse" },
        { id: "experiences", title: "Expériences privées" },
      ]}
    />
  );
}
