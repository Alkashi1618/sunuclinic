import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 ${trendUp ? "text-success" : "text-destructive"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
    </div>
  );
}
