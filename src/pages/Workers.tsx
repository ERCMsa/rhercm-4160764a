import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkers, createWorker, deleteWorker, type WorkerInsert } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Users, Search, Shield } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const emptyWorker: WorkerInsert = {
  full_name: "", cin: "", phone: "", position: "", department: "", address: "", matricule: "",
};

export default function Workers() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<WorkerInsert>({ ...emptyWorker });
  const [isDeptHead, setIsDeptHead] = useState(false);
  const [search, setSearch] = useState("");

  const { data: workers, isLoading } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });

  const createMutation = useMutation({
    mutationFn: () => createWorker({ ...form, is_department_head: isDeptHead }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setOpen(false);
      setForm({ ...emptyWorker });
      setIsDeptHead(false);
      toast.success("Employé ajouté");
    },
    onError: () => toast.error("Erreur lors de l'ajout"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      toast.success("Employé supprimé");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim()) { toast.error("Le nom est requis"); return; }
    createMutation.mutate();
  };

  const updateField = (key: keyof WorkerInsert, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const filtered = workers?.filter((w) => {
    const q = search.toLowerCase();
    return (
      w.full_name.toLowerCase().includes(q) ||
      (w.position ?? "").toLowerCase().includes(q) ||
      (w.department ?? "").toLowerCase().includes(q) ||
      (w.cin ?? "").toLowerCase().includes(q) ||
      (w.phone ?? "").toLowerCase().includes(q) ||
      (w.matricule ?? "").toLowerCase().includes(q)
    );
  });

  const formFields: { key: keyof WorkerInsert; label: string; placeholder: string }[] = [
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employés</h1>
          <p className="text-muted-foreground mt-1">Gérez vos employés</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Nouvel employé</DialogTitle>
              <DialogDescription>Remplissez les informations du nouvel employé. Les champs marqués * sont obligatoires.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formFields.map(({ key, label, placeholder }) => (
                  <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">{label}</Label>
                    <Input
                      value={(form[key] as string) ?? ""}
                      onChange={(e) => updateField(key, e.target.value)}
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
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Ajout..." : "Ajouter l'employé"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un employé (nom, poste, matricule, CIN...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid gap-3">
          {filtered.map((w) => (
            <Link key={w.id} to={`/workers/${w.id}`} className="block">
              <div className="bg-card border rounded-xl p-4 flex items-center justify-between hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {w.is_department_head ? (
                      <Shield className="w-5 h-5 text-primary" />
                    ) : (
                      <Users className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {w.full_name}
                      {w.is_department_head && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Chef de service</span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {[w.matricule ? `#${w.matricule}` : null, w.position, w.department].filter(Boolean).join(" • ") || "Aucun poste défini"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {w.phone && <span className="text-xs text-muted-foreground hidden sm:inline">{w.phone}</span>}
                  <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteMutation.mutate(w.id); }}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border">
          <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">
            {search ? "Aucun employé trouvé" : "Aucun employé. Ajoutez votre premier employé."}
          </p>
        </div>
      )}
    </div>
  );
}
