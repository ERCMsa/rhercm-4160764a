import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkers, createWorker, deleteWorker, type WorkerInsert } from "@/lib/supabase-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

const emptyWorker: WorkerInsert = {
  full_name: "", cin: "", phone: "", position: "", department: "", address: "",
};

export default function Workers() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<WorkerInsert>(emptyWorker);

  const { data: workers, isLoading } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });

  const createMutation = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setOpen(false);
      setForm(emptyWorker);
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
    createMutation.mutate(form);
  };

  const updateField = (key: keyof WorkerInsert, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

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
          <DialogContent>
            <DialogHeader><DialogTitle>Nouvel employé</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {([
                ["full_name", "Nom complet *"],
                ["cin", "CIN"],
                ["phone", "Téléphone"],
                ["position", "Poste"],
                ["department", "Département"],
                ["address", "Adresse"],
              ] as const).map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input value={(form[key] as string) ?? ""} onChange={(e) => updateField(key, e.target.value)} />
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Ajout..." : "Ajouter l'employé"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : workers && workers.length > 0 ? (
        <div className="grid gap-3">
          {workers.map((w) => (
            <div key={w.id} className="bg-card border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{w.full_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {[w.position, w.department].filter(Boolean).join(" • ") || "Aucun poste défini"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {w.phone && <span className="text-xs text-muted-foreground">{w.phone}</span>}
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(w.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border">
          <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Aucun employé. Ajoutez votre premier employé.</p>
        </div>
      )}
    </div>
  );
}
