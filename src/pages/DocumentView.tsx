import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DOCUMENT_TYPES } from "@/lib/supabase-helpers";
import { exportToPdf } from "@/lib/pdf-export";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import DocumentPreview from "@/components/DocumentPreview";
import type { Json } from "@/integrations/supabase/types";

export default function DocumentView() {
  const { id } = useParams<{ id: string }>();

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

  if (isLoading) return <p className="text-muted-foreground">Chargement...</p>;
  if (!doc) return <p className="text-destructive">Document introuvable</p>;

  const content = doc.content as Record<string, Json>;
  const worker = (doc as any).workers;
  const docType = doc.document_type as keyof typeof DOCUMENT_TYPES;
  const formData: Record<string, string> = {};
  for (const [k, v] of Object.entries(content)) {
    if (typeof v === "string") formData[k] = v;
  }

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
        <Button onClick={() => exportToPdf("document-preview", doc.title)} variant="outline">
          <Download className="w-4 h-4 mr-2" />Télécharger PDF
        </Button>
      </div>
      <div id="document-preview">
        <DocumentPreview type={docType} worker={worker} data={formData} />
      </div>
    </div>
  );
}
