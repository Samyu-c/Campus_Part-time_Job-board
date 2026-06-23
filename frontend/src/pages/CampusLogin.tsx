import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, Building } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const CampusLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup, isAuthenticated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("signup") === "true");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "professor">("student");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  // RECTIFIED: Added async/await to prevent race conditions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (isSignUp) {
        if (!name || !department) {
          toast.error("Please fill in all fields");
          return;
        }
        await signup(name, email, password, role, department);
        toast.success("Account created! Welcome to CampusGig");
      } else {
        await login(email, password);
        toast.success("Welcome back!");
      }
      // Only navigate AFTER the login/signup function completes
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Auth Error:", err);
      toast.error(err.response?.data?.error || "Invalid credentials");
    }
  };

  // RECTIFIED: Added async to demo login
  const demoLogin = async (demoRole: "student" | "professor") => {
    try {
      if (demoRole === "student") {
        await login("priya@campus.edu", "demo");
      } else {
        await login("ananya@campus.edu", "demo");
      }
      toast.success(`Logged in as demo ${demoRole}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Demo login failed. Is the backend running?");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            {isSignUp ? "Join CampusGig" : "Welcome Back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-center text-xs font-medium text-muted-foreground">Quick Demo Access</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => demoLogin("student")} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5">
              <GraduationCap className="h-4 w-4 text-primary" /> Student
            </button>
            <button type="button" onClick={() => demoLogin("professor")} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent hover:bg-accent/5">
              <Building className="h-4 w-4 text-accent" /> Professor
            </button>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or continue with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Role</label>
                <div className="flex gap-2">
                  {(["student", "professor"] as const).map((r) => (
                    <button key={r} type="button" onClick={() => setRole(r)} className={`flex-1 rounded-lg border py-2 text-sm font-semibold capitalize transition-all ${role === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Department</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science" className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@campus.edu" className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button type="submit" className="h-10 w-full rounded-lg bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-primary hover:underline">
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default CampusLogin;