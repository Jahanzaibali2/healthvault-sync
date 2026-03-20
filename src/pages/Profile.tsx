import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setDateOfBirth(profile.date_of_birth || "");
      setPhone(profile.phone || "");
      setEmergencyContact(profile.emergency_contact || "");
      setBloodType(profile.blood_type || "");
      setAllergies(profile.allergies || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          date_of_birth: dateOfBirth || null,
          phone: phone || null,
          emergency_contact: emergencyContact || null,
          blood_type: bloodType || null,
          allergies: allergies || null,
        })
        .eq("user_id", user.id);
      if (error) throw error;
      toast({ title: "Profile updated" });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-gradient-to-br from-slate-50/70 via-sky-50/45 to-emerald-50/45 p-4 md:p-6">
      <div className="rounded-2xl border border-primary/10 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-foreground/70">Manage your personal health information</p>
      </div>

      <Card className="border-primary/10 bg-gradient-to-b from-white to-sky-50/30 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact</Label>
                <Input value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} placeholder="Name & phone" />
              </div>
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select value={bloodType} onValueChange={setBloodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOOD_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Allergies</Label>
              <Textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="List any known allergies" rows={3} />
            </div>
            <Button type="submit" disabled={saving} className="shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-border/60 bg-white/70 p-3 text-center text-xs text-muted-foreground shadow-sm">
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
