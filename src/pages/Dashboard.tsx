import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderHeart, Activity, Shield, Lock, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: recordCount = 0 } = useQuery({
    queryKey: ["records-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("health_records")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const { data: vitalsCount = 0 } = useQuery({
    queryKey: ["vitals-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("vitals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-5xl space-y-8 rounded-3xl bg-gradient-to-br from-slate-50/70 via-sky-50/50 to-cyan-50/50 p-4 md:p-6">
      <div className="rounded-2xl border border-primary/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, {firstName}</h1>
        <p className="mt-1 text-sm text-foreground/70">Here&apos;s an overview of your health records</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/records">
          <Card className="cursor-pointer border-primary/10 bg-gradient-to-br from-white to-sky-50/70 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{recordCount}</p>
                <p className="text-sm text-muted-foreground">Records</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/vitals">
          <Card className="cursor-pointer border-success/20 bg-gradient-to-br from-white to-emerald-50/70 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 ring-1 ring-success/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{vitalsCount}</p>
                <p className="text-sm text-muted-foreground">Vitals Logged</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-accent/20 bg-gradient-to-br from-white to-cyan-50/70">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 ring-1 ring-accent/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Good</p>
              <p className="text-sm text-muted-foreground">Health Status</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/[0.06] to-accent/[0.06]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Your Privacy Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">End-to-end encryption</p>
              <p className="text-xs text-muted-foreground">All your health records are encrypted at rest and in transit</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FolderHeart className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">You own your data</p>
              <p className="text-xs text-muted-foreground">Your records are private and accessible only to you. We never share your data.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
