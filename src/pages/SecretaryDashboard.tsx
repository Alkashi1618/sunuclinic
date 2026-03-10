import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Users, Clock, Plus, Phone, Mail } from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/secretaire", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Gestion RDV", href: "/secretaire", icon: <Calendar className="h-4 w-4" /> },
  { label: "Patients", href: "/secretaire", icon: <Users className="h-4 w-4" /> },
  { label: "Créneaux", href: "/secretaire", icon: <Clock className="h-4 w-4" /> },
];

const recentActions = [
  { action: "RDV confirmé", patient: "Fatou Sow", doctor: "Dr. Diallo", time: "Il y a 5 min", icon: <Calendar className="h-4 w-4" /> },
  { action: "Appel patient", patient: "Moussa Diop", doctor: "—", time: "Il y a 15 min", icon: <Phone className="h-4 w-4" /> },
  { action: "Rappel envoyé", patient: "Marie Faye", doctor: "Dr. Martin", time: "Il y a 30 min", icon: <Mail className="h-4 w-4" /> },
  { action: "RDV annulé", patient: "Ibrahima Ba", doctor: "Dr. Ndiaye", time: "Il y a 1h", icon: <Calendar className="h-4 w-4" /> },
];

const SecretaryDashboard = () => {
  return (
    <DashboardLayout
      title="Accueil & Gestion"
      subtitle="Tableau de bord secrétariat"
      navItems={navItems}
      userRole="Secrétaire"
      userName="Mariam Seck"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="RDV aujourd'hui" value={24} icon={<Calendar className="h-5 w-5" />} />
        <StatCard title="Créneaux libres" value={8} icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Patients enregistrés" value={342} icon={<Users className="h-5 w-5" />} trend="+12 cette semaine" trendUp />
        <div className="bg-primary rounded-2xl p-6 shadow-card flex items-center justify-center">
          <Button variant="secondary" className="rounded-xl">
            <Plus className="h-4 w-4 mr-2" /> Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card rounded-2xl shadow-card border border-border/50">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold text-card-foreground">Activité récente</h2>
        </div>
        <div className="divide-y divide-border">
          {recentActions.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 hover:bg-accent/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground">
                  {item.patient} {item.doctor !== "—" && `• ${item.doctor}`}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecretaryDashboard;
