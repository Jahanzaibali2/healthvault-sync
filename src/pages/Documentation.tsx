import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Lightbulb, Info } from "lucide-react";

const builtItems = [
  "Auth: sign up, sign in, and profile management",
  "Report upload: file, category, date, notes, secure storage",
  "Records library: list, metadata display, file download",
  "Vitals logging: add manual vitals and view timeline list",
  "Privacy messaging: trust and encryption cues across UI",
  "Clinical UI system: polished navigation, gradients, and consistency",
];

const partialItems = [
  "Report categorization depth is basic (no full clinical taxonomy yet)",
  "Reports library supports listing and download, but not share/edit/delete flows",
  "Vitals are timeline-based; chart visuals are not yet implemented",
];

const deferredItems = [
  "Password reset flow",
  "Report detail page with preview and AI extraction placeholders",
  "Advanced search, filter, and sort controls in records library",
  "Vitals graphing, trend analysis, and threshold alerts",
  "Doctor sharing links, family accounts, Apple Health sync, offline mode",
];

export default function Documentation() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 rounded-3xl bg-gradient-to-br from-slate-50/70 via-sky-50/45 to-cyan-50/45 p-4 md:p-6">
      <div className="rounded-2xl border border-primary/10 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Walkthrough Note</h1>
        <p className="mt-1 text-sm text-foreground/70">
          Submission summary aligned to the assessment deliverable: what was built, what was skipped, and what comes next.
        </p>
      </div>

      <Card className="border-primary/10 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            1) What I Built
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="mb-2">
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              Completed Scope
            </Badge>
          </div>
          {builtItems.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-green-50/80 px-3 py-2 text-emerald-900"
            >
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            2) What I Skipped / Kept Partial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="mb-2">
            <Badge className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-50">
              Pending / Partial Scope
            </Badge>
          </div>
          {partialItems.map((item) => (
            <div key={item} className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-orange-900">
              {item}
            </div>
          ))}
          {deferredItems.map((item) => (
            <div key={item} className="rounded-lg border border-orange-200/80 bg-orange-50/70 px-3 py-2 text-orange-900">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-200/80 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-blue-900">
            <Info className="h-4 w-4 text-blue-600" />
            3) Why These Tradeoffs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-900/80">
          <div className="mb-2">
            <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Rationale
            </Badge>
          </div>
          <p className="rounded-lg border border-blue-200/80 bg-gradient-to-r from-blue-50/70 to-sky-50/70 px-3 py-2">
            Priority was on reliable end-to-end flows first: secure auth, record storage, retrieval,
            and vital logging. This gives real user value quickly under time constraints.
          </p>
          <p className="rounded-lg border border-blue-200/80 bg-gradient-to-r from-blue-50/70 to-sky-50/70 px-3 py-2">
            I focused on clinical visual polish, clarity, and trust cues because the rubric places
            high weight on attention to detail and product thinking.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">End-to-end first</Badge>
            <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">Trust-oriented UI</Badge>
            <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">Polished over broad</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/10 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            4) V2 Improvements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="mb-2">
            <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
              Next Steps
            </Badge>
          </div>
          <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50/80 px-3 py-2 text-amber-900">
            Full report detail screen with preview, metadata editing, and secure share links
          </div>
          <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50/80 px-3 py-2 text-amber-900">
            Graph-based vitals trends and basic alert thresholds for key metrics
          </div>
          <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50/80 px-3 py-2 text-amber-900">
            Stronger report search/filter/sort and category model expansion
          </div>
          <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50/80 px-3 py-2 text-amber-900">
            Dedicated password reset flow and edge-case hardening for upload/retry states
          </div>
          <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50/80 px-3 py-2 text-amber-900">
            Optional roadmap integrations (family accounts, Apple Health, offline support)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
