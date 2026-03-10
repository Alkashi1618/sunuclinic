import { Calendar, Shield, Bell, Clock, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calendar,
    title: "Prise de RDV en ligne",
    description: "Réservez votre consultation en quelques clics, 24h/24, 7j/7.",
  },
  {
    icon: Clock,
    title: "Disponibilités en temps réel",
    description: "Visualisez les créneaux disponibles instantanément.",
  },
  {
    icon: Bell,
    title: "Rappels automatiques",
    description: "Recevez des rappels par email et SMS avant votre rendez-vous.",
  },
  {
    icon: Users,
    title: "Dossier patient numérique",
    description: "Accédez à votre historique médical et vos ordonnances en ligne.",
  },
  {
    icon: Shield,
    title: "Données sécurisées",
    description: "Vos données de santé sont chiffrées et protégées selon les normes RGPD.",
  },
  {
    icon: BarChart3,
    title: "Tableau de bord intelligent",
    description: "Statistiques et KPIs en temps réel pour les praticiens.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tout pour simplifier votre parcours santé
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète pour les patients et les professionnels de santé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
