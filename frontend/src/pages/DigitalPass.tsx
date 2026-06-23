import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Plus, MapPin, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockOutPasses } from "@/data/campusData";
import { toast } from "sonner";

const statusConfig = {
  Approved: { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
  Pending: { icon: Clock, color: "text-campus-amber", bg: "bg-campus-amber/10", border: "border-campus-amber/20" },
  Rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
};

const DigitalPass = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const passes = mockOutPasses.filter((p) => p.studentId === user.id);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl font-bold text-foreground">Digital Pass</h1>
          </div>
          <button
            onClick={() => toast.info("New pass request form coming soon! (Demo mode)")}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Request Pass
          </button>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">View and manage your outpass requests</p>
      </motion.div>

      {passes.length === 0 ? (
        <div className="py-16 text-center">
          <Shield className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">No pass requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {passes.map((pass, i) => {
            const config = statusConfig[pass.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={pass.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border ${config.border} bg-card p-5`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <StatusIcon className={`h-5 w-5 ${config.color}`} />
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${config.bg} ${config.color}`}>
                        {pass.status}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">{pass.reason}</h3>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {pass.destination}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {pass.dateOut} → {pass.dateReturn}
                  </span>
                </div>

                {pass.approvedBy && (
                  <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
                    Approved by <span className="font-medium text-foreground">{pass.approvedBy}</span>
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DigitalPass;
