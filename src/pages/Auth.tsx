import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Stethoscope, Activity, FileHeart, HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import authImage from "@/assets/auth-medical.jpg";

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(email, password, fullName);
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1">
        <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
          <img
            src={authImage}
            alt="Healthcare professional in a modern clinic"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end p-12 pb-16 text-white">
            <div className="max-w-md space-y-6">
              <h2 className="text-3xl font-semibold leading-tight tracking-tight" style={{ lineHeight: "1.15" }}>
                Your health records,<br />always within reach.
              </h2>
              <p className="text-base leading-relaxed text-white/80">
                Securely store, track, and manage your medical history — all in one place.
              </p>
              <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Stethoscope className="h-4 w-4" />
                  <span>Records</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Activity className="h-4 w-4" />
                  <span>Vitals</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <FileHeart className="h-4 w-4" />
                  <span>Reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isSignUp
                  ? "Start managing your health records securely."
                  : "Sign in to access your health dashboard."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Sarah Mitchell"
                    required
                    className="h-11"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="mt-2 h-11 w-full transition-transform active:scale-[0.98]"
                disabled={submitting}
              >
                {submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-4 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Your data is encrypted and stored securely</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-primary/10 bg-gradient-to-r from-white via-sky-50/80 to-cyan-50/80 px-6 py-4 text-foreground">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/20 ring-1 ring-primary/20">
              <HeartPulse className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Health Vault</p>
              <p className="text-xs text-muted-foreground">Clinical Dashboard</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Securely managing your health data</p>
        </div>
      </footer>
    </div>
  );
}
