import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const doctors = [
  { id: 1, name: "Dr. Aminata Diallo", specialty: "Médecine générale", rating: 4.9, reviews: 127, nextSlot: "Aujourd'hui 14h30", address: "15 Rue de la Santé, Dakar", avatar: "👩🏾‍⚕️" },
  { id: 2, name: "Dr. Pierre Martin", specialty: "Cardiologue", rating: 4.8, reviews: 89, nextSlot: "Demain 09h00", address: "22 Avenue Foch, Dakar", avatar: "👨‍⚕️" },
  { id: 3, name: "Dr. Fatou Ndiaye", specialty: "Dermatologue", rating: 4.7, reviews: 64, nextSlot: "Aujourd'hui 16h00", address: "8 Rue Pasteur, Dakar", avatar: "👩🏾‍⚕️" },
  { id: 4, name: "Dr. Marc Dupont", specialty: "Pédiatre", rating: 4.9, reviews: 152, nextSlot: "Demain 10h30", address: "45 Boulevard de la République", avatar: "👨‍⚕️" },
  { id: 5, name: "Dr. Aïssatou Ba", specialty: "Ophtalmologue", rating: 4.6, reviews: 43, nextSlot: "Mercredi 11h00", address: "12 Rue Carnot, Dakar", avatar: "👩🏾‍⚕️" },
];

const SearchDoctors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        {/* Search header */}
        <div className="bg-primary-soft py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-foreground mb-6">Trouver un médecin</h1>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Nom, spécialité..." className="border-0 p-0 h-auto focus-visible:ring-0" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Ville, quartier..." className="border-0 p-0 h-auto focus-visible:ring-0" />
              </div>
              <Button size="lg" className="rounded-xl">Rechercher</Button>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Médecine générale", "Dentiste", "Ophtalmologue", "Dermatologue", "Pédiatre"].map((s) => (
                <Badge key={s} variant="secondary" className="cursor-pointer hover:bg-accent transition-colors rounded-full px-4 py-1.5">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 mt-8">
          <p className="text-sm text-muted-foreground mb-6">{doctors.length} résultats trouvés</p>

          <div className="space-y-4">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/rendez-vous/${doc.id}`}
                  className="flex items-center gap-6 bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl shrink-0">
                    {doc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-warm text-warm" />
                        {doc.rating} ({doc.reviews} avis)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {doc.address}
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                    <Badge className="bg-success/10 text-success border-0 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      {doc.nextSlot}
                    </Badge>
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      Prendre RDV <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchDoctors;
