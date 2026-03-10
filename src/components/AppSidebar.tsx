import { Link, useLocation } from "react-router-dom";
import { FileText, Users, LayoutDashboard, LogOut, LogIn, AlertTriangle, FilePlus, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/workers", label: "Employés", icon: Users },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/statistics", label: "Statistiques", icon: BarChart3 },
  { to: "/generate/contract", label: "Contrat", icon: FilePlus },
  { to: "/generate/bon_sortie", label: "Bon de sortie", icon: LogOut },
  { to: "/generate/bon_rentree", label: "Bon de rentrée", icon: LogIn },
  { to: "/generate/avertissement", label: "Avertissement", icon: AlertTriangle },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-primary tracking-tight flex items-center gap-2">
          <FileText className="w-6 h-6" />
          DocGen
        </h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Gestion documentaire</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
