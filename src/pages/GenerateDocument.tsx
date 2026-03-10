import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkers, createDocument, DOCUMENT_TYPES } from "@/lib/supabase-helpers";
import { exportToPdf } from "@/lib/pdf-export";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Save, Eye, Printer } from "lucide-react";
import { toast } from "sonner";
import DocumentPreview from "@/components/DocumentPreview";

type DocType = keyof typeof DOCUMENT_TYPES;

const todayStr = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

const getDefaultValues = (docType: DocType): Record<string, string> => {
  switch (docType) {
    case "contract":
      return { start_date: todayStr() };
    case "bon_sortie":
      return { sortie_date: todayStr(), sortie_time: nowTime() };
    case "bon_rentree":
      return { rentree_date: todayStr(), rentree_time: nowTime() };
    case "avertissement":
      return { avert_date: todayStr(), infraction_date: todayStr() };
    default:
      return {};
  }
};

const formFieldsByType: Record<DocType, { key: string; label: string; type?: string }[]> = {
  contract: [
    { key: "salary", label: "Salaire (DH)" },
    { key: "contract_type", label: "Type de contrat (CDI/CDD)" },
    { key: "start_date", label: "Date de début", type: "date" },
    { key: "end_date", label: "Date de fin (si CDD)", type: "date" },
    { key: "work_hours", label: "Horaires de travail" },
    { key: "notes", label: "Clauses supplémentaires", type: "textarea" },
  ],
  bon_sortie: [
    { key: "sortie_date", label: "Date de sortie", type: "date" },
    { key: "sortie_time", label: "Heure de sortie", type: "time" },
    { key: "reason", label: "Motif de sortie" },
    { key: "destination", label: "Destination" },
    { key: "return_expected", label: "Retour prévu", type: "time" },
  ],
  bon_rentree: [
    { key: "rentree_date", label: "Date de rentrée", type: "date" },
    { key: "rentree_time", label: "Heure de rentrée", type: "time" },
    { key: "absence_start", label: "Début d'absence", type: "date" },
    { key: "absence_reason", label: "Motif d'absence" },
    { key: "notes", label: "Observations", type: "textarea" },
  ],
  avertissement: [
    { key: "avert_date", label: "Date de l'avertissement", type: "date" },
    { key: "infraction", label: "Nature de l'infraction" },
    { key: "infraction_date", label: "Date de l'infraction", type: "date" },
    { key: "details", label: "Détails de l'infraction", type: "textarea" },
    { key: "sanctions", label: "Sanctions prévues" },
  ],
};

export default function GenerateDocument() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const docType = type as DocType;

  const [workerId, setWorkerId] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>(() => getDefaultValues(docType));
  const [showPreview, setShowPreview] = useState(false);

  const { data: workers } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });
  const selectedWorker = workers?.find((w) => w.id === workerId);

  const saveMutation = useMutation({
    mutationFn: () =>
      createDocument({
        worker_id: workerId,
        document_type: docType,
        title: `${DOCUMENT_TYPES[docType].label} - ${selectedWorker?.full_name}`,
        content: { ...formData, worker: selectedWorker },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document sauvegardé");
      navigate("/documents");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  if (!docType || !DOCUMENT_TYPES[docType]) {
    return <p className="text-destructive">Type de document invalide</p>;
  }

  const fields = formFieldsByType[docType];

  const handleDownloadPdf = () => {
    exportToPdf("document-preview", `${DOCUMENT_TYPES[docType].label}_${selectedWorker?.full_name ?? "doc"}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{DOCUMENT_TYPES[docType].label}</h1>
        <p className="text-muted-foreground mt-1">Remplissez les informations pour générer le document</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-xl p-6 space-y-5">
          <div>
            <Label>Employé *</Label>
            <Select value={workerId} onValueChange={setWorkerId}>
              <SelectTrigger><SelectValue placeholder="Sélectionner un employé" /></SelectTrigger>
              <SelectContent>
                {workers?.map((w) => (
                  <SelectItem key={w.id} value={w.id}>{w.full_name} — {w.position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {fields.map((field) => (
            <div key={field.key}>
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  value={formData[field.key] ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                />
              ) : (
                <Input
                  type={field.type ?? "text"}
                  value={formData[field.key] ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <Button onClick={() => setShowPreview(true)} disabled={!workerId} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />Aperçu
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!workerId || saveMutation.isPending} className="flex-1">
              <Save className="w-4 h-4 mr-2" />{saveMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </div>

        {showPreview && selectedWorker && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <Button onClick={() => window.print()} variant="outline">
                <Printer className="w-4 h-4 mr-2" />Imprimer
              </Button>
              <Button onClick={handleDownloadPdf} variant="outline">
                <Download className="w-4 h-4 mr-2" />Télécharger PDF
              </Button>
            </div>
            <div id="document-preview">
              <DocumentPreview type={docType} worker={selectedWorker} data={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
