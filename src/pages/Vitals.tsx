import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Activity, Heart, Thermometer, Droplets, Scale } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const VITAL_TYPES = [
  { value: "blood_pressure_systolic", label: "Blood Pressure (Systolic)", unit: "mmHg", icon: Heart },
  { value: "blood_pressure_diastolic", label: "Blood Pressure (Diastolic)", unit: "mmHg", icon: Heart },
  { value: "heart_rate", label: "Heart Rate", unit: "bpm", icon: Activity },
  { value: "temperature", label: "Temperature", unit: "°F", icon: Thermometer },
  { value: "blood_sugar", label: "Blood Sugar", unit: "mg/dL", icon: Droplets },
  { value: "weight", label: "Weight", unit: "lbs", icon: Scale },
];

export default function Vitals() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [addOpen, setAddOpen] = useState(false);
  const [vitalType, setVitalType] = useState("");
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: vitals = [], isLoading } = useQuery({
    queryKey: ["vitals", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vitals")
        .select("*")
        .eq("user_id", user!.id)
        .order("recorded_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !vitalType || !value) return;
    setSubmitting(true);
    const typeInfo = VITAL_TYPES.find((t) => t.value === vitalType);
    try {
      const { error } = await supabase.from("vitals").insert({
        user_id: user.id,
        type: vitalType,
        value: parseFloat(value),
        unit: typeInfo?.unit || "",
      });
      if (error) throw error;
      toast({ title: "Vital recorded" });
      queryClient.invalidateQueries({ queryKey: ["vitals"] });
      queryClient.invalidateQueries({ queryKey: ["vitals-count"] });
      setAddOpen(false);
      setVitalType("");
      setValue("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (type: string) => {
    const found = VITAL_TYPES.find((t) => t.value === type);
    const Icon = found?.icon || Activity;
    return <Icon className="w-4 h-4" />;
  };

  const getLabel = (type: string) => VITAL_TYPES.find((t) => t.value === type)?.label || type;

  return (
    <div className="mx-auto max-w-5xl space-y-6 rounded-3xl bg-gradient-to-br from-slate-50/70 via-emerald-50/40 to-cyan-50/45 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl border border-success/20 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Vitals</h1>
          <p className="mt-1 text-sm text-foreground/70">Track your health measurements</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Log Vital
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : vitals.length === 0 ? (
        <Card className="border-2 border-dashed border-success/25 bg-gradient-to-br from-white to-emerald-50/60">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 ring-1 ring-success/20">
              <Activity className="w-7 h-7 text-success" />
            </div>
            <h3 className="font-medium text-lg mb-1">No vitals logged</h3>
            <p className="text-sm text-muted-foreground mb-4">Start tracking your health measurements</p>
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Log Your First Vital
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {vitals.map((vital) => (
            <Card
              key={vital.id}
              className="border-success/15 bg-gradient-to-r from-white to-emerald-50/40 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success ring-1 ring-success/20">
                  {getIcon(vital.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getLabel(vital.type)}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(vital.recorded_at), "MMM d, yyyy h:mm a")}</p>
                </div>
                <p className="text-lg font-semibold">
                  {vital.value} <span className="text-sm text-muted-foreground font-normal">{vital.unit}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-sm border-success/20 bg-gradient-to-b from-white to-emerald-50/40">
          <DialogHeader>
            <DialogTitle>Log Vital</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={vitalType} onValueChange={setVitalType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vital type" />
                </SelectTrigger>
                <SelectContent>
                  {VITAL_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Value {vitalType && `(${VITAL_TYPES.find((t) => t.value === vitalType)?.unit})`}</Label>
              <Input type="number" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
