import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadRecordModal } from "@/components/UploadRecordModal";
import { Plus, FileText, Image, FolderHeart, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Records() {
  const { user } = useAuth();
  const [uploadOpen, setUploadOpen] = useState(false);
  const { toast } = useToast();

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["health-records", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_records")
        .select("*")
        .eq("user_id", user!.id)
        .order("record_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleDownload = async (filePath: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from("health-records")
      .download(filePath);
    if (error) {
      toast({ title: "Download failed", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (fileType: string | null) => {
    if (fileType?.startsWith("image/")) return <Image className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 rounded-3xl bg-gradient-to-br from-slate-50/70 via-sky-50/45 to-cyan-50/45 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl border border-primary/10 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
          <h1 className="text-2xl font-semibold tracking-tight">Records Library</h1>
          <p className="mt-1 text-sm text-foreground/70">Your secure digital health vault</p>
        </div>
        <Button onClick={() => setUploadOpen(true)} className="shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Upload Record
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : records.length === 0 ? (
        <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-white to-sky-50/70">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <FolderHeart className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-1">No records yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">Upload your first health record to start building your secure digital vault</p>
            <Button onClick={() => setUploadOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Your First Record
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <Card
              key={record.id}
              className="border-primary/10 bg-gradient-to-r from-white to-sky-50/40 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                  {record.file_type ? getFileIcon(record.file_type) : <FileText className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{record.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{record.category}</Badge>
                    <span className="text-xs text-muted-foreground">{format(new Date(record.record_date), "MMM d, yyyy")}</span>
                  </div>
                  {record.notes && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{record.notes}</p>
                  )}
                </div>
                {record.file_path && record.file_name && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(record.file_path!, record.file_name!)}
                    className="shrink-0 rounded-lg hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UploadRecordModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}
