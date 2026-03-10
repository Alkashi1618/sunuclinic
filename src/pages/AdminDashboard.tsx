import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { LayoutDashboard, Users, BarChart3, Settings, TrendingUp, Calendar, Activity, Shield } from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Utilisateurs", href: "/admin", icon: <Users className="h-4 w-4" /> },
  { label: "Statistiques", href: "/admin", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Paramètres", href: "/admin", icon: <Settings className="h-4 w-4" /> },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout
      title="Administration"
      subtitle="Vue d'ensemble de la clinique"
      navItems={navItems}
      userRole="Administrateur"
      userName="Admin Système"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Patients inscrits" value="10,247" icon={<Users className="h-5 w-5" />} trend="+5.2% ce mois" trendUp />
        <StatCard title="RDV ce mois" value="1,842" icon={<Calendar className="h-5 w-5" />} trend="+12% vs mois dernier" trendUp />
        <StatCard title="Taux de remplissage" value="87%" icon={<TrendingUp className="h-5 w-5" />} trend="+3%" trendUp />
        <StatCard title="Taux d'absence" value="8%" icon={<Activity className="h-5 w-5" />} trend="-2%" trendUp />
      </div>

      {/* Quick overview cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Utilisateurs par rôle
          </h3>
          <div className="space-y-4">
            {[
              { role: "Patients", count: 10247, color: "bg-primary" },
              { role: "Médecins", count: 45, color: "bg-info" },
              { role: "Secrétaires", count: 12, color: "bg-warm" },
              { role: "Administrateurs", count: 3, color: "bg-destructive" },
            ].map((item) => (
              <div key={item.role} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-foreground flex-1">{item.role}</span>
                <span className="text-sm font-bold text-foreground">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Sécurité
          </h3>
          <div className="space-y-4">
            {[
              { label: "Dernière sauvegarde", value: "Aujourd'hui 06:00" },
              { label: "Connexions (24h)", value: "342" },
              { label: "Tentatives échouées", value: "7" },
              { label: "Conformité RGPD", value: "✅ Conforme" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
