import { motion } from "framer-motion";
import { mockAnnouncements } from "@/data/mockData";
import { Megaphone, AlertTriangle, Info } from "lucide-react";

export function AnnouncementsFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="cricket-card"
    >
      <div className="mb-4 flex items-center gap-2">
        <Megaphone className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
          Announcements
        </h3>
      </div>

      <div className="space-y-3">
        {mockAnnouncements.map((a) => (
          <div
            key={a.id}
            className={`rounded-lg border p-3 ${
              a.type === "warning"
                ? "border-accent/30 bg-accent/5"
                : "border-border/50 bg-card"
            }`}
          >
            <div className="mb-1 flex items-center gap-2">
              {a.type === "warning" ? (
                <AlertTriangle className="h-3.5 w-3.5 text-gold-dark" />
              ) : (
                <Info className="h-3.5 w-3.5 text-primary" />
              )}
              <span className="text-sm font-semibold text-foreground">{a.title}</span>
            </div>
            <p className="text-xs text-muted-foreground">{a.content}</p>
            <p className="mt-1.5 text-xs text-muted-foreground/70">{a.date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
