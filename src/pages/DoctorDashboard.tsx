import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Calendar, Users, Settings, Clock, UserCheck, UserX } from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/medecin", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Mon planning", href: "/medecin", icon: <Calendar className="h-4 w-4" /> },
  { label: "Mes patients", href: "/medecin", icon: <Users className="h-4 w-4" /> },
  { label: "Paramètres", href: "/medecin", icon: <Settings className="h-4 w-4" /> },
];

const todayAppointments = [
  { time: "08:00", patient: "Fatou Sow", motif: "Consultation de routine", status: "done" },
  { time: "08:30", patient: "Moussa Diop", motif: "Suivi tension artérielle", status: "done" },
  { time: "09:00", patient: "Marie Faye", motif: "Douleurs abdominales", status: "in-progress" },
  { time: "09:30", patient: "Ibrahima Ba", motif: "Renouvellement ordonnance", status: "waiting" },
  { time: "10:00", patient: "Aïssatou Diallo", motif: "Vaccination", status: "waiting" },
  { time: "10:30", patient: "—", motif: "", status: "free" },
  { time: "11:00", patient: "Omar Ndiaye", motif: "Bilan de santé", status: "waiting" },
];

const statusMap: Record<string, { label: string; className: string }> = {
  done: { label: "Terminé", className: "bg-muted text-muted-foreground border-0" },
  "in-progress": { label: "En cours", className: "bg-primary/10 text-primary border-0" },
  waiting: { label: "En attente", className: "bg-warm/10 text-warm border-0" },
  free: { label: "Libre", className: "bg-success/10 text-success border-0" },
};

const DoctorDashboard = () => {
  return (
    <DashboardLayout
      title="Mon planning du jour"
      subtitle="Mercredi 10 mars 2026"
      navItems={navItems}
      userRole="Médecin"
      userName="Dr. Aminata Diallo"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="RDV aujourd'hui" value={6} icon={<Calendar className="h-5 w-5" />} />
        <StatCard title="Patients vus" value={2} icon={<UserCheck className="h-5 w-5" />} />
        <StatCard title="En attente" value={3} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Absences (mois)" value={1} icon={<UserX className="h-5 w-5" />} trend="↓ 50% vs mois dernier" trendUp />
      </div>

      <div className="bg-card rounded-2xl shadow-card border border-border/50">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-card-foreground">Planning du jour</h2>
        </div>
        <div className="divide-y divide-border">
          {todayAppointments.map((apt, i) => (
            <div key={i} className={`flex items-center gap-4 p-5 ${apt.status === "in-progress" ? "bg-primary/5" : "hover:bg-accent/30"} transition-colors`}>
              <div className="w-16 text-center">
                <span className="text-sm font-bold text-foreground">{apt.time}</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${apt.status === "free" ? "text-muted-foreground italic" : "text-card-foreground"}`}>
                  {apt.patient}
                </p>
                {apt.motif && <p className="text-sm text-muted-foreground">{apt.motif}</p>}
              </div>
              <Badge className={statusMap[apt.status].className}>
                {statusMap[apt.status].label}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
