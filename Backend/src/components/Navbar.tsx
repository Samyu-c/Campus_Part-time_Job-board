import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Trophy, CalendarDays, Users, BarChart3, MapPin } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Trophy },
  { path: "/tournaments", label: "Tournaments", icon: Trophy },
  { path: "/fixtures", label: "Fixtures", icon: CalendarDays },
  { path: "/teams", label: "Teams", icon: Users },
  { path: "/stats", label: "Stats", icon: BarChart3 },
  { path: "/grounds", label: "Grounds", icon: MapPin },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            CricManager
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-card px-4 py-3 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2 border-t border-border pt-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-md border border-border px-3 py-2 text-center text-sm font-semibold text-foreground"
            >
              Log in
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
