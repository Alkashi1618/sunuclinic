import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-clinic.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Clinique médicale moderne" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Prenez rendez-vous avec votre{" "}
            <span className="text-accent">médecin</span> en quelques clics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-primary-foreground/80 mb-8"
          >
            Accédez à des centaines de praticiens, consultez leurs disponibilités en temps réel et réservez votre créneau 24h/24.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl p-3 shadow-elevated flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Spécialité, médecin..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Ville, quartier..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button size="lg" className="rounded-xl px-8" asChild>
              <Link to="/recherche">
                <Calendar className="h-5 w-5 mr-2" />
                Rechercher
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-8 mt-10"
          >
            {[
              { value: "150+", label: "Médecins" },
              { value: "10k+", label: "Patients" },
              { value: "50k+", label: "RDV pris" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
