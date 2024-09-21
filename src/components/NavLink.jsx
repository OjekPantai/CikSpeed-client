/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function NavLink({ to, icon: Icon, children, isActive, badge }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-primary"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
      {badge !== undefined && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
}
