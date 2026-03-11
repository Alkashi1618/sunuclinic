import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    const result = register({
      email,
      password,
      firstName,
      lastName,
      phone: phone || undefined,
      dateOfBirth: dob || undefined,
      role: "patient",
    });

    if (result.success) {
      navigate("/patient");
    } else {
      setError(result.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center">
          <Heart className="h-16 w-16 text-primary-foreground/90 mx-auto mb-8 fill-primary-foreground/20" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Rejoignez MédiCare</h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Créez votre compte patient et prenez rendez-vous avec vos médecins en quelques clics.
          </p>
        </div>
      </div>

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

          <h1 className="text-2xl font-bold text-foreground mb-2">Inscription Patient</h1>
          <p className="text-muted-foreground mb-8">Créez votre dossier médical en ligne</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" placeholder="Jean" className="h-11 rounded-xl" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" placeholder="Dupont" className="h-11 rounded-xl" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date de naissance</Label>
              <Input id="dob" type="date" className="h-11 rounded-xl" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" className="h-11 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" className="h-11 rounded-xl" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 caractères"
                  className="h-11 rounded-xl pr-12"
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
              <p className="text-xs text-muted-foreground">Min. 8 caractères, 1 majuscule, 1 chiffre, 1 symbole</p>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" className="mt-1 accent-primary" required />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                J'accepte les <a href="#" className="text-primary hover:underline">conditions d'utilisation</a> et la{" "}
                <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 rounded-xl text-base mt-2">
              Créer mon compte
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="text-primary font-medium hover:underline">Se connecter</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
