import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, HeartPulse } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-sky-50/50 to-cyan-50/60">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="rounded-2xl border border-primary/10 bg-white/90 p-5 text-center shadow-sm backdrop-blur-sm">
            <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Healthcare App</h1>
            <p className="text-sm text-foreground/70">Your personal health records, securely managed</p>
          </div>

          <Card className="border-primary/10 bg-white/90 shadow-lg shadow-primary/5 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
              <CardDescription>
                {isSignUp ? "Start managing your health records securely" : "Sign in to access your health records"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-primary hover:underline"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-white/70 p-3 text-xs text-muted-foreground shadow-sm">
            <Shield className="w-3.5 h-3.5" />
            <span>Your data is encrypted and stored securely</span>
          </div>
        </div>
      </div>
      <footer className="border-t border-white/10 bg-black px-6 py-4 text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <HeartPulse className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Health Vault</p>
              <p className="text-xs text-white/70">Clinical Dashboard</p>
            </div>
          </div>
          <p className="text-xs text-white/60">Securely managing your health data</p>
        </div>
      </footer>
    </div>
  );
}
