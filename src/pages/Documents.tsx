import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocuments, deleteDocument, DOCUMENT_TYPES } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Documents() {
  const queryClient = useQueryClient();
  const { data: documents, isLoading } = useQuery({ queryKey: ["documents"], queryFn: getDocuments });

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document supprimé");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-1">Tous les documents générés</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : documents && documents.length > 0 ? (
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Titre</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employé</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium">{doc.title}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {DOCUMENT_TYPES[doc.document_type as keyof typeof DOCUMENT_TYPES]?.label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {(doc as any).workers?.full_name ?? "—"}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(doc.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/documents/${doc.id}`}>
                      <Button variant="ghost" size="sm">Voir</Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(doc.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Aucun document créé</p>
        </div>
      )}
    </div>
  );
}
