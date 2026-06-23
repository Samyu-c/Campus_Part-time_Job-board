import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, MapPin, Sparkles } from "lucide-react";
import { Gig } from "@/data/campusData";
import { Badge } from "@/components/ui/badge";

interface GigCardProps {
  gig: Gig;
  index?: number;
}

const typeColors: Record<string, string> = {
  Research: "bg-primary/10 text-primary border-primary/20",
  Club: "bg-accent/10 text-accent border-accent/20",
  Admin: "bg-secondary text-secondary-foreground border-border",
  Tutoring: "bg-campus-amber/10 text-campus-amber border-campus-amber/20",
  Event: "bg-campus-rose/10 text-campus-rose border-campus-rose/20",
};

export function GigCard({ gig, index = 0 }: GigCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/gigs/${gig.id}`} className="block">
        <div className="gig-card group">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${typeColors[gig.type] || ""}`}>
                  {gig.type}
                </span>
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                  gig.status === "Open" ? "bg-accent/10 text-accent" : gig.status === "In Progress" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {gig.status}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {gig.title}
              </h3>
            </div>
            {gig.payType !== "Unpaid" && gig.payAmount && (
              <span className="shrink-0 rounded-lg bg-accent/10 px-2.5 py-1 font-mono text-xs font-bold text-accent">
                {gig.payAmount}
              </span>
            )}
          </div>

          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {gig.description}
          </p>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {gig.skillsRequired.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-[11px] font-medium">
                {skill}
              </Badge>
            ))}
            {gig.skillsRequired.length > 4 && (
              <Badge variant="secondary" className="text-[11px]">+{gig.skillsRequired.length - 4}</Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {gig.department}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {gig.applicants} applied
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {gig.deadline}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs text-muted-foreground">
              By <span className="font-medium text-foreground">{gig.postedByName}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/5 px-2 py-1 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3 w-3" />
              {gig.payType}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
