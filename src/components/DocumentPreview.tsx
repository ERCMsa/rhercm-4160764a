import type { Worker } from "@/lib/supabase-helpers";

interface Props {
  type: "contract" | "bon_sortie" | "bon_rentree" | "avertissement";
  worker: Worker;
  data: Record<string, string>;
}

export default function DocumentPreview({ type, worker, data }: Props) {
  const today = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });

  const templates: Record<string, React.ReactNode> = {
    contract: (
      <div className="doc-page" style={{ backgroundColor: "white", color: "#1a1a2e" }}>
        <div className="doc-header">
          <p className="doc-title">CONTRAT DE TRAVAIL</p>
          <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>{data.contract_type === "CDD" ? "Contrat à Durée Déterminée" : "Contrat à Durée Indéterminée"}</p>
        </div>
        <p style={{ marginBottom: 16 }}>Fait le <span className="doc-field">{today}</span></p>
        <p><strong>Entre :</strong></p>
        <p style={{ marginBottom: 16 }}>La société <span className="doc-field">[Nom de la société]</span>, ci-après dénommée "l'Employeur"</p>
        <p><strong>Et :</strong></p>
        <p>M./Mme <span className="doc-field">{worker.full_name}</span></p>
        <p>CIN : <span className="doc-field">{worker.cin || "—"}</span></p>
        <p>Adresse : <span className="doc-field">{worker.address || "—"}</span></p>
        <p style={{ marginBottom: 16 }}>Ci-après dénommé(e) "l'Employé(e)"</p>

        <p><strong>Article 1 — Poste :</strong> <span className="doc-field">{worker.position || "—"}</span></p>
        <p><strong>Article 2 — Département :</strong> <span className="doc-field">{worker.department || "—"}</span></p>
        <p><strong>Article 3 — Date de début :</strong> <span className="doc-field">{data.start_date || "—"}</span></p>
        {data.end_date && <p><strong>Article 4 — Date de fin :</strong> <span className="doc-field">{data.end_date}</span></p>}
        <p><strong>Article {data.end_date ? "5" : "4"} — Rémunération :</strong> <span className="doc-field">{data.salary || "—"} DH/mois</span></p>
        <p><strong>Article {data.end_date ? "6" : "5"} — Horaires :</strong> <span className="doc-field">{data.work_hours || "—"}</span></p>
        {data.notes && <><p><strong>Clauses supplémentaires :</strong></p><p>{data.notes}</p></>}

        <div className="doc-signature">
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>L'Employeur</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>L'Employé(e)</p>
          </div>
        </div>
      </div>
    ),

    bon_sortie: (
      <div className="doc-page" style={{ backgroundColor: "white", color: "#1a1a2e" }}>
        <div className="doc-header">
          <p className="doc-title">BON DE SORTIE</p>
        </div>
        <p>Date : <span className="doc-field">{data.sortie_date || today}</span></p>
        <p>Nom de l'employé : <span className="doc-field">{worker.full_name}</span></p>
        <p>Poste : <span className="doc-field">{worker.position || "—"}</span></p>
        <p>Département : <span className="doc-field">{worker.department || "—"}</span></p>
        <p>Heure de sortie : <span className="doc-field">{data.sortie_time || "—"}</span></p>
        <p>Motif : <span className="doc-field">{data.reason || "—"}</span></p>
        <p>Destination : <span className="doc-field">{data.destination || "—"}</span></p>
        <p>Retour prévu : <span className="doc-field">{data.return_expected || "—"}</span></p>

        <div className="doc-signature">
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>Responsable</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>Employé(e)</p>
          </div>
        </div>
      </div>
    ),

    bon_rentree: (
      <div className="doc-page" style={{ backgroundColor: "white", color: "#1a1a2e" }}>
        <div className="doc-header">
          <p className="doc-title">BON DE RENTRÉE</p>
        </div>
        <p>Date de rentrée : <span className="doc-field">{data.rentree_date || today}</span></p>
        <p>Heure de rentrée : <span className="doc-field">{data.rentree_time || "—"}</span></p>
        <p>Nom de l'employé : <span className="doc-field">{worker.full_name}</span></p>
        <p>Poste : <span className="doc-field">{worker.position || "—"}</span></p>
        <p>Département : <span className="doc-field">{worker.department || "—"}</span></p>
        <p>Début d'absence : <span className="doc-field">{data.absence_start || "—"}</span></p>
        <p>Motif d'absence : <span className="doc-field">{data.absence_reason || "—"}</span></p>
        {data.notes && <p>Observations : <span className="doc-field">{data.notes}</span></p>}

        <div className="doc-signature">
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>Responsable</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>Employé(e)</p>
          </div>
        </div>
      </div>
    ),

    avertissement: (
      <div className="doc-page" style={{ backgroundColor: "white", color: "#1a1a2e" }}>
        <div className="doc-header">
          <p className="doc-title">LETTRE D'AVERTISSEMENT</p>
        </div>
        <p>Date : <span className="doc-field">{data.avert_date || today}</span></p>
        <p style={{ marginBottom: 16 }}>À l'attention de M./Mme <span className="doc-field">{worker.full_name}</span></p>
        <p>Poste : <span className="doc-field">{worker.position || "—"}</span></p>
        <p>Département : <span className="doc-field">{worker.department || "—"}</span></p>

        <p style={{ marginTop: 24 }}>Objet : <strong>Avertissement</strong></p>
        <p style={{ marginTop: 16 }}>
          Nous avons constaté le <span className="doc-field">{data.infraction_date || "—"}</span> l'infraction suivante :
        </p>
        <p><span className="doc-field">{data.infraction || "—"}</span></p>
        {data.details && <p style={{ marginTop: 8 }}>{data.details}</p>}
        <p style={{ marginTop: 16 }}>
          Par la présente, nous vous adressons un avertissement formel. En cas de récidive, des sanctions plus sévères pourront être appliquées{data.sanctions ? ` : ${data.sanctions}` : "."}.
        </p>
        <p style={{ marginTop: 16 }}>Nous vous prions de prendre les mesures nécessaires pour éviter toute récidive.</p>

        <div className="doc-signature">
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>La Direction</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ borderTop: "1px solid #ccc", paddingTop: 8, minWidth: 200 }}>Employé(e)</p>
          </div>
        </div>
      </div>
    ),
  };

  return <>{templates[type]}</>;
}
