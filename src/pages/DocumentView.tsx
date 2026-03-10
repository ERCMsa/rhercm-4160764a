import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DOCUMENT_TYPES, validateDocument, getDepartmentHeads } from "@/lib/supabase-helpers";
import { exportToPdf } from "@/lib/pdf-export";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Printer, CheckCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import DocumentPreview from "@/components/DocumentPreview";
import type { Json } from "@/integrations/supabase/types";

export default function DocumentView() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [validatorId, setValidatorId] = useState("");

  const { data: doc, isLoading } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*, workers(*)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: deptHeads } = useQuery({
    queryKey: ["department-heads"],
    queryFn: getDepartmentHeads,
  });

  const validateMutation = useMutation({
    mutationFn: ({ role }: { role: "responsible" | "rh" }) => validateDocument(id!, role, validatorId || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
      toast.success("Document validé");
    },
    onError: () => toast.error("Erreur de validation"),
  });

  if (isLoading) return <p className="text-muted-foreground">Chargement...</p>;
  if (!doc) return <p className="text-destructive">Document introuvable</p>;

  const content = doc.content as Record<string, Json>;
  const worker = (doc as any).workers;
  const docType = doc.document_type as keyof typeof DOCUMENT_TYPES;
  const formData: Record<string, string> = {};
  for (const [k, v] of Object.entries(content)) {
    if (typeof v === "string") formData[k] = v;
  }

  const isBon = docType === "bon_sortie" || docType === "bon_rentree";
  const isValidatedResp = (doc as any).validated_by_responsible;
  const isValidatedRh = (doc as any).validated_by_rh;

  // Filter dept heads matching the worker's department
  const matchingHeads = deptHeads?.filter((h: any) =>
    h.department && worker?.department && h.department.toLowerCase() === worker.department.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/documents"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold">{doc.title}</h1>
            <p className="text-sm text-muted-foreground">Créé le {new Date(doc.created_at).toLocaleDateString("fr-FR")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} variant="outline">
            <Printer className="w-4 h-4 mr-2" />Imprimer
          </Button>
          <Button onClick={() => exportToPdf("document-preview", doc.title)} variant="outline">
            <Download className="w-4 h-4 mr-2" />Télécharger PDF
          </Button>
        </div>
      </div>

      {/* Validation panel for bon_sortie / bon_rentree */}
      {isBon && (
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Validation du document</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chef de service validation */}
            <div className={`border rounded-lg p-4 ${isValidatedResp ? "border-green-500 bg-green-50" : "border-muted"}`}>
              <p className="font-medium text-sm mb-2">Chef de Service</p>
              {isValidatedResp ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Validé {(doc as any).responsible_validated_at ? `le ${new Date((doc as any).responsible_validated_at).toLocaleDateString("fr-FR")}` : ""}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Select value={validatorId} onValueChange={setValidatorId}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Sélectionner le responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      {matchingHeads && matchingHeads.length > 0 ? (
                        matchingHeads.map((h: any) => (
                          <SelectItem key={h.id} value={h.id}>{h.full_name} — {h.department}</SelectItem>
                        ))
                      ) : (
                        deptHeads?.map((h: any) => (
                          <SelectItem key={h.id} value={h.id}>{h.full_name} — {h.department}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="w-full" disabled={validateMutation.isPending} onClick={() => validateMutation.mutate({ role: "responsible" })}>
                    Valider (Chef de Service)
                  </Button>
                </div>
              )}
            </div>

            {/* RH validation */}
            <div className={`border rounded-lg p-4 ${isValidatedRh ? "border-green-500 bg-green-50" : "border-muted"}`}>
              <p className="font-medium text-sm mb-2">RH</p>
              {isValidatedRh ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Validé {(doc as any).rh_validated_at ? `le ${new Date((doc as any).rh_validated_at).toLocaleDateString("fr-FR")}` : ""}</span>
                </div>
              ) : (
                <Button size="sm" className="w-full" disabled={validateMutation.isPending} onClick={() => validateMutation.mutate({ role: "rh" })}>
                  Valider (RH)
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div id="document-preview">
        <DocumentPreview
          type={docType}
          worker={worker}
          data={formData}
          validationStatus={isBon ? {
            validated_by_responsible: isValidatedResp,
            validated_by_rh: isValidatedRh,
            responsible_validated_at: (doc as any).responsible_validated_at,
            rh_validated_at: (doc as any).rh_validated_at,
          } : undefined}
        />
      </div>
    </div>
  );
}
