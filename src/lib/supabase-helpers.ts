import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Worker = Database["public"]["Tables"]["workers"]["Row"];
type WorkerInsert = Database["public"]["Tables"]["workers"]["Insert"];
type Document = Database["public"]["Tables"]["documents"]["Row"];
type DocumentInsert = Database["public"]["Tables"]["documents"]["Insert"];

export type { Worker, WorkerInsert, Document, DocumentInsert };

export async function getWorkers() {
  const { data, error } = await supabase.from("workers").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getWorker(id: string) {
  const { data, error } = await supabase.from("workers").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function createWorker(worker: WorkerInsert) {
  const { data, error } = await supabase.from("workers").insert(worker).select().single();
  if (error) throw error;
  return data;
}

export async function updateWorker(id: string, worker: Partial<WorkerInsert>) {
  const { data, error } = await supabase.from("workers").update(worker).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteWorker(id: string) {
  const { error } = await supabase.from("workers").delete().eq("id", id);
  if (error) throw error;
}

export async function getDocuments() {
  const { data, error } = await supabase.from("documents").select("*, workers(full_name)").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getDocumentsByWorker(workerId: string) {
  const { data, error } = await supabase.from("documents").select("*").eq("worker_id", workerId).order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createDocument(doc: DocumentInsert) {
  const { data, error } = await supabase.from("documents").insert(doc).select().single();
  if (error) throw error;
  return data;
}

export async function deleteDocument(id: string) {
  const { error } = await supabase.from("documents").delete().eq("id", id);
  if (error) throw error;
}

export const DOCUMENT_TYPES = {
  contract: { label: "Contrat de travail", icon: "FileText" },
  bon_sortie: { label: "Bon de sortie", icon: "LogOut" },
  bon_rentree: { label: "Bon de rentrée", icon: "LogIn" },
  avertissement: { label: "Avertissement", icon: "AlertTriangle" },
} as const;
