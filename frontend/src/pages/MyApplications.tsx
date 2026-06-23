import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockApplications } from "@/data/campusData";
import { ApplicationCard } from "@/components/ApplicationCard";

const MyApplications = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const apps = mockApplications.filter((a) => a.studentId === user.id);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">My Applications</h1>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">Track your gig applications and AI scores</p>
      </motion.div>

      {apps.length === 0 ? (
        <div className="py-16 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">No applications yet. Browse the gig board to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app, i) => (
            <ApplicationCard key={app.id} application={app} viewAs="student" index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
