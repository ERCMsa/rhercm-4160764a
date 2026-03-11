import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorker, getDocumentsByWorker, updateWorker, DOCUMENT_TYPES, type WorkerInsert } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, FileText, Users, Shield, CheckCircle, Clock, Pencil } from "lucide-react";
import { toast } from "sonner";

export default function WorkerDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

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

  const [editForm, setEditForm] = useState<Partial<WorkerInsert>>({});
  const [isDeptHead, setIsDeptHead] = useState(false);

  const openEdit = () => {
    if (!worker) return;
    setEditForm({
      full_name: worker.full_name,
      cin: worker.cin ?? "",
      phone: worker.phone ?? "",
      position: worker.position ?? "",
      department: worker.department ?? "",
      address: worker.address ?? "",
      matricule: worker.matricule ?? "",
    });
    setIsDeptHead(worker.is_department_head ?? false);
    setEditOpen(true);
  };

  const editMutation = useMutation({
    mutationFn: () => updateWorker(id!, { ...editForm, is_department_head: isDeptHead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worker", id] });
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setEditOpen(false);
      toast.success("Employé mis à jour");
    },
    onError: () => toast.error("Erreur lors de la mise à jour"),
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.full_name?.trim()) { toast.error("Le nom est requis"); return; }
    editMutation.mutate();
  };

  if (loadingWorker) return <p className="text-muted-foreground">Chargement...</p>;
  if (!worker) return <p className="text-destructive">Employé introuvable</p>;

  const isBon = (type: string) => type === "bon_sortie" || type === "bon_rentree";

  const editFields: { key: keyof WorkerInsert; label: string; placeholder: string }[] = [
    { key: "matricule", label: "Matricule", placeholder: "Ex: EMP-001" },
    { key: "full_name", label: "Nom complet *", placeholder: "Nom et prénom" },
    { key: "cin", label: "CIN", placeholder: "Ex: AB123456" },
    { key: "phone", label: "Téléphone", placeholder: "Ex: 06 12 34 56 78" },
    { key: "position", label: "Poste", placeholder: "Ex: Technicien" },
    { key: "department", label: "Département", placeholder: "Ex: Production" },
    { key: "address", label: "Adresse", placeholder: "Adresse complète" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/workers"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {worker.full_name}
              {worker.is_department_head && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Chef de service
                </span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[worker.matricule ? `#${worker.matricule}` : null, worker.position, worker.department].filter(Boolean).join(" • ")}
            </p>
          </div>
        </div>
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={openEdit}><Pencil className="w-4 h-4 mr-2" />Modifier</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Modifier l'employé</DialogTitle>
              <DialogDescription>Modifiez les informations de {worker.full_name}.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {editFields.map(({ key, label, placeholder }) => (
                  <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</Label>
                    <Input
                      value={(editForm[key] as string) ?? ""}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="h-11"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                <Switch checked={isDeptHead} onCheckedChange={setIsDeptHead} />
                <div>
                  <Label className="cursor-pointer font-medium">Responsable de département</Label>
                  <p className="text-xs text-muted-foreground">Cet employé est chef de service</p>
                </div>
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={editMutation.isPending}>
                  {editMutation.isPending ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border rounded-xl p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ["Matricule", worker.matricule],
          ["CIN", worker.cin],
          ["Téléphone", worker.phone],
          ["Adresse", worker.address],
          ["Poste", worker.position],
          ["Département", worker.department],
          ["Date d'embauche", worker.hire_date ? new Date(worker.hire_date).toLocaleDateString("fr-FR") : null],
          ["Responsable", worker.is_department_head ? "Oui" : "Non"],
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
          <div className="bg-card border rounded-xl overflow-hidden overflow-x-auto">
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
                  const respOk = doc.validated_by_responsible;
                  const rhOk = doc.validated_by_rh;
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
