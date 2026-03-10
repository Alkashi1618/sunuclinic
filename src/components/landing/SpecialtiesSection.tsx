import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const specialties = [
  { name: "Médecine générale", emoji: "🩺", count: 45 },
  { name: "Dentiste", emoji: "🦷", count: 28 },
  { name: "Ophtalmologue", emoji: "👁️", count: 15 },
  { name: "Dermatologue", emoji: "🧴", count: 12 },
  { name: "Pédiatre", emoji: "👶", count: 20 },
  { name: "Gynécologue", emoji: "🤰", count: 18 },
  { name: "Cardiologue", emoji: "❤️", count: 10 },
  { name: "Orthopédiste", emoji: "🦴", count: 8 },
];

export function SpecialtiesSection() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos spécialités médicales
          </h2>
          <p className="text-lg text-muted-foreground">
            Trouvez le bon spécialiste pour votre besoin.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialties.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to="/recherche"
                className="block bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 border border-border/50"
              >
                <span className="text-4xl mb-3 block">{s.emoji}</span>
                <h3 className="font-semibold text-card-foreground text-sm mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.count} praticiens</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
