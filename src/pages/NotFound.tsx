import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/60 to-cyan-50/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-primary/10 bg-white/85 p-8 text-center shadow-lg shadow-primary/5 backdrop-blur-sm">
        <h1 className="mb-2 text-5xl font-bold tracking-tight">404</h1>
        <p className="mb-5 text-base text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="font-medium text-primary underline-offset-4 hover:underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
