import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const doctor = {
  name: "Dr. Aminata Diallo",
  specialty: "Médecine générale",
  rating: 4.9,
  reviews: 127,
  address: "15 Rue de la Santé, Dakar",
  avatar: "👩🏾‍⚕️",
  bio: "Médecin généraliste avec 12 ans d'expérience. Spécialisée en médecine préventive et suivi des maladies chroniques.",
};

const generateDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

const BookAppointment = () => {
  useParams();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");
  const [motif, setMotif] = useState("");
  const days = generateDays();

  const unavailable = new Set(["09:00", "10:30", "14:30", "16:00"]);

  const dayFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short" });
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
  const fullDateFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Rendez-vous confirmé !</h1>
            <p className="text-muted-foreground mb-2">
              {doctor.name} — {doctor.specialty}
            </p>
            <p className="text-foreground font-medium mb-1">
              {fullDateFormatter.format(days[selectedDay])} à {selectedTime}
            </p>
            <p className="text-sm text-muted-foreground mb-8">{doctor.address}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" asChild className="rounded-xl">
                <Link to="/patient">Mon tableau de bord</Link>
              </Button>
              <Button asChild className="rounded-xl">
                <Link to="/">Retour à l'accueil</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/recherche" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="h-4 w-4" /> Retour aux résultats
          </Link>

          {/* Doctor card */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-4xl">{doctor.avatar}</div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">{doctor.name}</h1>
                <p className="text-muted-foreground">{doctor.specialty}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warm text-warm" />{doctor.rating}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{doctor.address}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{doctor.bio}</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "select" ? (
              <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Day selector */}
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Choisissez un créneau
                </h2>

                <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                  {days.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                      className={`flex flex-col items-center px-4 py-3 rounded-xl border min-w-[72px] transition-all ${
                        selectedDay === i
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card border-border hover:border-primary/30 text-card-foreground"
                      }`}
                    >
                      <span className="text-xs font-medium capitalize">{dayFormatter.format(day)}</span>
                      <span className="text-lg font-bold">{day.getDate()}</span>
                      <span className="text-[10px] capitalize">{dateFormatter.format(day).split(" ")[1]}</span>
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                  {timeSlots.map((time) => {
                    const taken = unavailable.has(time);
                    return (
                      <button
                        key={time}
                        disabled={taken}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                          taken
                            ? "bg-muted text-muted-foreground/40 border-border cursor-not-allowed line-through"
                            : selectedTime === time
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card border-border text-card-foreground hover:border-primary/40"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl h-12 text-base"
                  disabled={!selectedTime}
                  onClick={() => setStep("confirm")}
                >
                  Continuer <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <h2 className="text-lg font-semibold text-foreground mb-6">Confirmer votre rendez-vous</h2>

                <div className="bg-accent/50 rounded-2xl p-6 mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Praticien</span>
                    <span className="font-medium text-foreground">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spécialité</span>
                    <span className="font-medium text-foreground">{doctor.specialty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{fullDateFormatter.format(days[selectedDay])}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Heure</span>
                    <Badge className="bg-primary/10 text-primary border-0">{selectedTime}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lieu</span>
                    <span className="font-medium text-foreground">{doctor.address}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground block mb-2">Motif de consultation (optionnel)</label>
                  <textarea
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                    placeholder="Décrivez brièvement la raison de votre visite..."
                    className="w-full h-24 p-4 rounded-xl border border-border bg-card text-sm resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={() => setStep("select")}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Retour
                  </Button>
                  <Button className="flex-1 rounded-xl h-12 text-base" onClick={() => setStep("done")}>
                    <Check className="h-5 w-5 mr-2" /> Confirmer
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookAppointment;
