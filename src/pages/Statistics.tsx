import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocuments, DOCUMENT_TYPES } from "@/lib/supabase-helpers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { format, parseISO, startOfMonth, startOfYear, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

type Period = "daily" | "monthly" | "yearly";

const COLORS = ["hsl(220,70%,50%)", "hsl(40,90%,50%)", "hsl(150,60%,40%)", "hsl(0,70%,50%)"];

export default function Statistics() {
  const [period, setPeriod] = useState<Period>("monthly");
  const { data: documents } = useQuery({ queryKey: ["documents"], queryFn: getDocuments });

  const docs = documents ?? [];

  // Pie chart data
  const typeCounts = Object.entries(DOCUMENT_TYPES).map(([key, { label }]) => ({
    name: label,
    value: docs.filter((d) => d.document_type === key).length,
  }));

  // Bar chart data grouped by period
  const groupKey = (dateStr: string) => {
    const d = parseISO(dateStr);
    if (period === "daily") return format(d, "dd/MM/yyyy");
    if (period === "monthly") return format(d, "MMM yyyy", { locale: fr });
    return format(d, "yyyy");
  };

  const grouped: Record<string, Record<string, number>> = {};
  docs.forEach((doc) => {
    const key = groupKey(doc.created_at);
    if (!grouped[key]) grouped[key] = {};
    grouped[key][doc.document_type] = (grouped[key][doc.document_type] || 0) + 1;
  });

  const barData = Object.entries(grouped)
    .map(([period, counts]) => ({ period, ...counts }))
    .sort((a, b) => a.period.localeCompare(b.period));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
          <p className="text-muted-foreground mt-1">Analyse de la production documentaire</p>
        </div>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Journalier</SelectItem>
            <SelectItem value="monthly">Mensuel</SelectItem>
            <SelectItem value="yearly">Annuel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {typeCounts.map((t, i) => (
          <div key={t.name} className="bg-card border rounded-xl p-5 text-center">
            <p className="text-3xl font-bold" style={{ color: COLORS[i] }}>{t.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Documents par période</h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Legend />
                {Object.entries(DOCUMENT_TYPES).map(([key, { label }], i) => (
                  <Bar key={key} dataKey={key} name={label} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Aucune donnée</p>
          )}
        </div>

        {/* Pie chart */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Répartition par type</h2>
          {docs.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={typeCounts} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {typeCounts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Aucune donnée</p>
          )}
        </div>
      </div>
    </div>
  );
}
