import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, FileText, User, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Tableau de bord", href: "/patient", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Mes rendez-vous", href: "/patient", icon: <Calendar className="h-4 w-4" /> },
  { label: "Mon dossier", href: "/patient", icon: <FileText className="h-4 w-4" /> },
  { label: "Mon profil", href: "/patient", icon: <User className="h-4 w-4" /> },
];

const appointments = [
  { id: 1, doctor: "Dr. Aminata Diallo", specialty: "Médecine générale", date: "12 mars 2026", time: "14:30", status: "confirmed" },
  { id: 2, doctor: "Dr. Pierre Martin", specialty: "Cardiologue", date: "18 mars 2026", time: "09:00", status: "pending" },
  { id: 3, doctor: "Dr. Fatou Ndiaye", specialty: "Dermatologue", date: "5 mars 2026", time: "16:00", status: "completed" },
];

const statusLabels: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Confirmé", className: "bg-success/10 text-success border-0" },
  pending: { label: "En attente", className: "bg-warm/10 text-warm border-0" },
  completed: { label: "Terminé", className: "bg-muted text-muted-foreground border-0" },
};

const PatientDashboard = () => {
  return (
    <DashboardLayout
      title="Tableau de bord"
      subtitle="Bienvenue, Jean Dupont"
      navItems={navItems}
      userRole="Patient"
      userName="Jean Dupont"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="RDV à venir" value={2} icon={<Calendar className="h-5 w-5" />} />
        <StatCard title="Consultations totales" value={12} icon={<FileText className="h-5 w-5" />} />
        <StatCard title="Prochain RDV" value="12 mars" icon={<Clock className="h-5 w-5" />} />
        <div className="bg-primary rounded-2xl p-6 shadow-card flex items-center justify-center">
          <Button variant="secondary" className="rounded-xl" asChild>
            <Link to="/recherche">
              <Plus className="h-4 w-4 mr-2" /> Nouveau RDV
            </Link>
          </Button>
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-card rounded-2xl shadow-card border border-border/50">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-card-foreground">Mes rendez-vous</h2>
        </div>
        <div className="divide-y divide-border">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 p-6 hover:bg-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-2xl">
                👩🏾‍⚕️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground">{apt.doctor}</p>
                <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-card-foreground">{apt.date}</p>
                <p className="text-xs text-muted-foreground">{apt.time}</p>
              </div>
              <Badge className={statusLabels[apt.status].className}>
                {statusLabels[apt.status].label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
