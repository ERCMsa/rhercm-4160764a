import type { Worker } from "@/lib/supabase-helpers";
import logoErcm from "@/assets/logo-ercm.png";

interface Props {
  type: "contract" | "bon_sortie" | "bon_rentree" | "avertissement";
  worker: Worker;
  data: Record<string, string>;
}

function DocHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="doc-header">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <img src={logoErcm} alt="ERCM SA" style={{ height: 64, objectFit: "contain" }} />
        <div style={{ textAlign: "right", fontSize: 11, color: "#666", lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>ERCM SA</p>
          <p style={{ margin: 0 }}>Etudes Réalisation Construction Métallique</p>
        </div>
      </div>
      <div style={{ borderTop: "3px solid #c41a1a", borderBottom: "1px solid #ddd", padding: "14px 0", marginTop: 8 }}>
        <p className="doc-title" style={{ color: "#1a1a2e", letterSpacing: 2 }}>{title}</p>
        {subtitle && <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function DocSignature({ left, right }: { left: string; right: string }) {
  return (
    <div className="doc-signature" style={{ marginTop: 60, paddingTop: 20 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: 60 }} />
        <p style={{ borderTop: "2px solid #1a1a2e", paddingTop: 8, minWidth: 200, fontSize: 13, fontWeight: 600 }}>{left}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ height: 60 }} />
        <p style={{ borderTop: "2px solid #1a1a2e", paddingTop: 8, minWidth: 200, fontSize: 13, fontWeight: 600 }}>{right}</p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={{ display: "flex", marginBottom: 6, fontSize: 14 }}>
      <span style={{ minWidth: 200, fontWeight: 600, color: "#333" }}>{label} :</span>
      <span style={{ borderBottom: "1px dotted #bbb", flex: 1, paddingBottom: 2, color: "#1a1a2e" }}>{value || "—"}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, fontWeight: 700, color: "#c41a1a", textTransform: "uppercase", letterSpacing: 1, marginTop: 20, marginBottom: 10, borderLeft: "3px solid #c41a1a", paddingLeft: 10 }}>
      {children}
    </p>
  );
}

export default function DocumentPreview({ type, worker, data }: Props) {
  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const pageStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "#1a1a2e",
    padding: "40px 48px",
    maxWidth: 800,
    margin: "0 auto",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: 14,
    lineHeight: 1.8,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    borderRadius: 8,
  };

  const templates: Record<string, React.ReactNode> = {
    contract: (
      <div style={pageStyle}>
        <DocHeader title="CONTRAT DE TRAVAIL" subtitle={data.contract_type === "CDD" ? "Contrat à Durée Déterminée" : "Contrat à Durée Indéterminée"} />
        <p style={{ textAlign: "right", fontSize: 13, color: "#666", marginBottom: 24 }}>Fait le {today}</p>

        <SectionTitle>Les parties</SectionTitle>
        <p style={{ marginBottom: 6 }}><strong>Entre :</strong> La société <strong>ERCM SA</strong>, ci-après dénommée "l'Employeur"</p>
        <p style={{ marginBottom: 16 }}><strong>Et :</strong></p>
        <Field label="Nom complet" value={worker.full_name} />
        <Field label="CIN" value={worker.cin} />
        <Field label="Adresse" value={worker.address} />

        <SectionTitle>Conditions du contrat</SectionTitle>
        <Field label="Poste" value={worker.position} />
        <Field label="Département" value={worker.department} />
        <Field label="Date de début" value={data.start_date} />
        {data.end_date && <Field label="Date de fin" value={data.end_date} />}
        <Field label="Rémunération" value={data.salary ? `${data.salary} DH/mois` : undefined} />
        <Field label="Horaires" value={data.work_hours} />

        {data.notes && (
          <>
            <SectionTitle>Clauses supplémentaires</SectionTitle>
            <p style={{ fontSize: 13, color: "#444", whiteSpace: "pre-wrap" }}>{data.notes}</p>
          </>
        )}

        <DocSignature left="L'Employeur" right="L'Employé(e)" />
      </div>
    ),

    bon_sortie: (
      <div style={pageStyle}>
        <DocHeader title="BON DE SORTIE" />
        <p style={{ textAlign: "right", fontSize: 13, color: "#666", marginBottom: 24 }}>Date : {data.sortie_date || today}</p>

        <SectionTitle>Informations de l'employé</SectionTitle>
        <Field label="Nom complet" value={worker.full_name} />
        <Field label="Poste" value={worker.position} />
        <Field label="Département" value={worker.department} />

        <SectionTitle>Détails de la sortie</SectionTitle>
        <Field label="Heure de sortie" value={data.sortie_time} />
        <Field label="Motif" value={data.reason} />
        <Field label="Destination" value={data.destination} />
        <Field label="Retour prévu" value={data.return_expected} />

        <DocSignature left="Responsable" right="Employé(e)" />
      </div>
    ),

    bon_rentree: (
      <div style={pageStyle}>
        <DocHeader title="BON DE RENTRÉE" />
        <p style={{ textAlign: "right", fontSize: 13, color: "#666", marginBottom: 24 }}>Date : {data.rentree_date || today}</p>

        <SectionTitle>Informations de l'employé</SectionTitle>
        <Field label="Nom complet" value={worker.full_name} />
        <Field label="Poste" value={worker.position} />
        <Field label="Département" value={worker.department} />

        <SectionTitle>Détails de la rentrée</SectionTitle>
        <Field label="Heure de rentrée" value={data.rentree_time} />
        <Field label="Début d'absence" value={data.absence_start} />
        <Field label="Motif d'absence" value={data.absence_reason} />
        {data.notes && <Field label="Observations" value={data.notes} />}

        <DocSignature left="Responsable" right="Employé(e)" />
      </div>
    ),

    avertissement: (
      <div style={pageStyle}>
        <DocHeader title="LETTRE D'AVERTISSEMENT" />
        <p style={{ textAlign: "right", fontSize: 13, color: "#666", marginBottom: 24 }}>Date : {data.avert_date || today}</p>

        <SectionTitle>Destinataire</SectionTitle>
        <Field label="Nom complet" value={worker.full_name} />
        <Field label="Poste" value={worker.position} />
        <Field label="Département" value={worker.department} />

        <SectionTitle>Objet : Avertissement</SectionTitle>
        <p style={{ fontSize: 13, color: "#444", marginBottom: 8 }}>
          Nous avons constaté le <strong>{data.infraction_date || "—"}</strong> l'infraction suivante :
        </p>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", padding: "10px 14px", backgroundColor: "#f8f8f8", border: "1px solid #eee", borderRadius: 4, marginBottom: 12 }}>
          {data.infraction || "—"}
        </p>
        {data.details && <p style={{ fontSize: 13, color: "#444", whiteSpace: "pre-wrap", marginBottom: 12 }}>{data.details}</p>}
        <p style={{ fontSize: 13, color: "#444" }}>
          Par la présente, nous vous adressons un avertissement formel. En cas de récidive, des sanctions plus sévères pourront être appliquées{data.sanctions ? ` : ${data.sanctions}` : "."}.
        </p>
        <p style={{ fontSize: 13, color: "#444", marginTop: 12 }}>
          Nous vous prions de prendre les mesures nécessaires pour éviter toute récidive.
        </p>

        <DocSignature left="La Direction" right="Employé(e)" />
      </div>
    ),
  };

  return <>{templates[type]}</>;
}
