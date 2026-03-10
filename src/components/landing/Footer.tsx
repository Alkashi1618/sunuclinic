import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary-foreground font-bold text-xl mb-4">
              <Heart className="h-5 w-5 fill-primary text-primary" />
              MédiCare
            </div>
            <p className="text-sm leading-relaxed">
              La plateforme de gestion de clinique qui simplifie la prise de rendez-vous pour tous.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Patients</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recherche" className="hover:text-primary-foreground transition-colors">Trouver un médecin</Link></li>
              <li><Link to="/inscription" className="hover:text-primary-foreground transition-colors">Créer un compte</Link></li>
              <li><Link to="/connexion" className="hover:text-primary-foreground transition-colors">Se connecter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Professionnels</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/connexion" className="hover:text-primary-foreground transition-colors">Espace praticien</Link></li>
              <li><Link to="/connexion" className="hover:text-primary-foreground transition-colors">Espace secrétaire</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">CGU</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm">
          © 2026 MédiCare. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
