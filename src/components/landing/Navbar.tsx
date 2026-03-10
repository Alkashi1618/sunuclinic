import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Heart className="h-6 w-6 fill-primary" />
          <span>MédiCare</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Accueil</Link>
          <Link to="/recherche" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Trouver un médecin</Link>
          <Link to="/a-propos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">À propos</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/connexion">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link to="/inscription">S'inscrire</Link>
          </Button>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="flex flex-col gap-2 p-4">
              <Link to="/" className="py-2 text-sm font-medium" onClick={() => setOpen(false)}>Accueil</Link>
              <Link to="/recherche" className="py-2 text-sm font-medium" onClick={() => setOpen(false)}>Trouver un médecin</Link>
              <Link to="/connexion" className="py-2 text-sm font-medium" onClick={() => setOpen(false)}>Se connecter</Link>
              <Button asChild className="mt-2">
                <Link to="/inscription" onClick={() => setOpen(false)}>S'inscrire</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
