import { motion } from "framer-motion";
import { Calendar, Brain } from "lucide-react";
import { AIScoreBadge } from "@/components/AIScoreBadge";
import { Badge } from "@/components/ui/badge";

interface ApplicationCardProps {
  application: any; // Using any to match the dynamic backend object
  viewAs: "student" | "professor";
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  index?: number;
}

// RECTIFIED: Status styles matching your backend's UPPERCASE strings
const statusStyles: Record<string, string> = {
  PENDING: "bg-secondary text-muted-foreground",
  ACCEPTED: "bg-accent/10 text-accent",
  REJECTED: "bg-destructive/10 text-destructive",
  COMPLETED: "bg-primary/10 text-primary",
};

export function ApplicationCard({ application, viewAs, onAccept, onReject, index = 0 }: ApplicationCardProps) {
  // Safe extraction of skills (handles both string from SQLite or array)
  const skillTags = typeof application.skills === 'string' 
    ? application.skills.split(',') 
    : (application.skills || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="gig-card"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-display text-sm font-bold text-foreground">
              {/* RECTIFIED: Use studentName for professors, job title for students */}
              {viewAs === "professor" ? application.studentName : application.job?.title}
            </h3>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[application.status] || statusStyles.PENDING}`}>
              {application.status}
            </span>
          </div>
          {viewAs === "professor" && (
            <p className="text-xs text-muted-foreground">Candidate</p>
          )}
        </div>
        {/* RECTIFIED: Use aiScore instead of matchScore */}
        <AIScoreBadge score={application.aiScore || 0} size="sm" showLabel={false} />
      </div>

      {/* RECTIFIED: Use coverNote instead of bio */}
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {application.coverNote || "No cover note provided."}
      </p>

      <div className="mt-2 flex flex-wrap gap-1">
        {skillTags.slice(0, 5).map((s: string) => (
          
          <Badge key={s} variant="secondary" className="text-[10px]">{s.trim()}</Badge>
        ))}
      </div>
      

      {/* RECTIFIED: Use aiFeedback instead of matchAnalysis */}
      {application.aiFeedback && (
        <div className="mt-3 rounded-lg bg-primary/5 p-3 border border-primary/10">
          <p className="text-xs font-medium text-primary/80">
            <span className="flex items-center gap-1 font-bold text-primary mb-1">
              <Brain className="h-3 w-3" /> AI Analysis:
            </span> 
            {application.aiFeedback}
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {/* RECTIFIED: Use createdAt instead of appliedAt */}
          Applied {new Date(application.createdAt).toLocaleDateString()}
        </span>
        
        {viewAs === "professor" && application.status === "PENDING" && (
          <div className="flex gap-2">
            <button
              onClick={() => onReject?.(application.id)}
              className="rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
            >
              Reject
            </button>
            <button
              onClick={() => onAccept?.(application.id)}
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90 shadow-sm"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}