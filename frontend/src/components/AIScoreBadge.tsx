import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { getScoreColor, getScoreLabel } from "@/data/campusData";

interface AIScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AIScoreBadge({ score, showLabel = true, size = "md" }: AIScoreBadgeProps) {
  const colorClass = getScoreColor(score);
  const label = getScoreLabel(score);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${sizeClasses[size]} score-badge flex items-center justify-center rounded-full font-mono font-bold ${
          score >= 70
            ? "bg-accent/15 text-accent"
            : score >= 40
            ? "bg-campus-amber/15 text-campus-amber"
            : "bg-destructive/15 text-destructive"
        }`}
      >
        {score}
      </motion.div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Brain className="h-3 w-3" />
            AI Score
          </span>
          <span className={`text-xs font-medium ${
            score >= 70 ? "text-accent" : score >= 40 ? "text-campus-amber" : "text-destructive"
          }`}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
