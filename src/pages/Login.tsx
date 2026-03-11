import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/mockDatabase";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { key: "patient" as const, label: "Patient" },
    { key: "medecin" as const, label: "Médecin" },
    { key: "secretaire" as const, label: "Secrétaire" },
    { key: "admin" as const, label: "Admin" },
  ];

  const dashboardRoutes: Record<string, string> = {
    patient: "/patient",
    medecin: "/medecin",
    secretaire: "/secretaire",
    admin: "/admin",
  };

  const demoCredentials: Record<string, { email: string; password: string }> = {
    patient: { email: "patient@medicare.fr", password: "Patient123!" },
    medecin: { email: "medecin@medicare.fr", password: "Medecin123!" },
    secretaire: { email: "secretaire@medicare.fr", password: "Secret123!" },
    admin: { email: "admin@medicare.fr", password: "Admin123!" },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password, role);
    if (result.success) {
      navigate(dashboardRoutes[role]);
    } else {
      setError(result.error || "Erreur de connexion");
    }
  };

  const fillDemo = () => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center">
          <Heart className="h-16 w-16 text-primary-foreground/90 mx-auto mb-8 fill-primary-foreground/20" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Bienvenue sur MédiCare</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Gérez vos rendez-vous médicaux, consultez votre dossier patient et restez connecté avec vos praticiens.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl mb-8 lg:hidden">
            <Heart className="h-6 w-6 fill-primary" />
            MédiCare
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">Connexion</h1>
          <p className="text-muted-foreground mb-8">Accédez à votre espace personnel</p>

          {/* Role selector */}
          <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-6">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => { setRole(r.key); setError(""); }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  role === r.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Demo credentials hint */}
          <button
            type="button"
            onClick={fillDemo}
            className="w-full mb-6 p-3 rounded-xl border border-dashed border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/10 transition-colors text-center"
          >
            🔑 Remplir avec les identifiants démo ({roles.find(r => r.key === role)?.label})
          </button>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="h-12 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-xs text-primary hover:underline">Mot de passe oublié ?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 rounded-xl text-base">
              Se connecter
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Pas encore de compte ?{" "}
            <Link to="/inscription" className="text-primary font-medium hover:underline">S'inscrire</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
