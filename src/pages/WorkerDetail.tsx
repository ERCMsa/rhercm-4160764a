import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getWorker, getDocumentsByWorker, DOCUMENT_TYPES } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, Shield, CheckCircle, Clock } from "lucide-react";

export default function WorkerDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: worker, isLoading: loadingWorker } = useQuery({
    queryKey: ["worker", id],
    queryFn: () => getWorker(id!),
    enabled: !!id,
  });

  const { data: documents, isLoading: loadingDocs } = useQuery({
    queryKey: ["worker-documents", id],
    queryFn: () => getDocumentsByWorker(id!),
    enabled: !!id,
  });

  if (loadingWorker) return <p className="text-muted-foreground">Chargement...</p>;
  if (!worker) return <p className="text-destructive">Employé introuvable</p>;

  const isBon = (type: string) => type === "bon_sortie" || type === "bon_rentree";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/workers"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {worker.full_name}
            {(worker as any).is_department_head && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> Chef de service
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            {[(worker as any).matricule ? `#${(worker as any).matricule}` : null, worker.position, worker.department].filter(Boolean).join(" • ")}
          </p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ["Matricule", (worker as any).matricule],
          ["CIN", worker.cin],
          ["Téléphone", worker.phone],
          ["Adresse", worker.address],
          ["Poste", worker.position],
          ["Département", worker.department],
          ["Date d'embauche", worker.hire_date ? new Date(worker.hire_date).toLocaleDateString("fr-FR") : null],
          ["Responsable", (worker as any).is_department_head ? "Oui" : "Non"],
        ].map(([label, value]) => (
          <div key={label as string}>
            <p className="text-xs text-muted-foreground">{label as string}</p>
            <p className="font-medium">{(value as string) || "—"}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Documents ({documents?.length ?? 0})</h2>
        {loadingDocs ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : documents && documents.length > 0 ? (
          <div className="bg-card border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => {
                  const bon = isBon(doc.document_type);
                  const respOk = (doc as any).validated_by_responsible;
                  const rhOk = (doc as any).validated_by_rh;
                  return (
                    <tr key={doc.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{doc.title}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {DOCUMENT_TYPES[doc.document_type as keyof typeof DOCUMENT_TYPES]?.label}
                        </span>
                      </td>
                      <td className="p-4">
                        {bon ? (
                          respOk && rhOk ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle className="w-3.5 h-3.5" /> Validé</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600"><Clock className="w-3.5 h-3.5" /> En attente</span>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(doc.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/documents/${doc.id}`}>
                          <Button variant="ghost" size="sm">Voir</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-card rounded-xl border">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground">Aucun document pour cet employé</p>
          </div>
        )}
      </div>
    </div>
  );
}
