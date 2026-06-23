import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users, Plus, Brain, AlertCircle, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [allApplications, setAllApplications] = useState<any[]>([]);
  const [myGigs, setMyGigs] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5001/api";

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [appRes, gigRes] = await Promise.all([
          axios.get(`${API_BASE}/applications`, { headers }),
          axios.get(`${API_BASE}/jobs`)
        ]);

        const apps = Array.isArray(appRes.data) ? appRes.data : (appRes.data.applications || []);
        const jobs = Array.isArray(gigRes.data.jobs) ? gigRes.data.jobs : (gigRes.data || []);
        
        setAllApplications(apps);
        setMyGigs(jobs);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, [isAuthenticated, navigate]);

  if (loading || !user) return <div className="p-20 text-center font-display animate-pulse text-primary">Syncing Dashboard...</div>;

  const isStudent = user.role?.toUpperCase() === "STUDENT";

  // Counts and Filtering
  const studentApps = allApplications.filter(a => String(a.studentId) === String(user.id));
  const myPostedGigs = myGigs.filter(g => String(g.posterId) === String(user.id));
  const myPostedIds = myPostedGigs.map(g => String(g.id));
  const incomingAppsCount = allApplications.filter(a => myPostedIds.includes(String(a.jobId))).length;

  const stats = isStudent ? [
    { label: "Applications", value: studentApps.length, icon: FileText, color: "text-primary" },
    { label: "Avg AI Score", value: "85%", icon: Brain, color: "text-amber-500" }
  ] : [
    { label: "Your Gigs", value: myPostedGigs.length, icon: Briefcase, color: "text-primary" },
    { label: "Applicants", value: incomingAppsCount, icon: Users, color: "text-blue-500" }
  ];

  const displayItems = isStudent ? studentApps : myPostedGigs;

  // Manual Navigation Function
  const handleCardClick = (item: any) => {
    const targetId = isStudent ? item.jobId : item.id;
    console.log("Navigating to Gig ID:", targetId); // Check your console!
    if (targetId) {
      navigate(`/gigs/${targetId}`);
    } else {
      console.error("No ID found for this item", item);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name?.split(" ")[0] || "User"} 👋</h1>
          <p className="text-sm text-muted-foreground">Manage your campus opportunities</p>
        </div>
        {!isStudent && (
          <button 
            onClick={() => navigate("/post-gig")} 
            className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-bold"
          >
            <Plus size={20}/> Post Gig
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="p-6 border rounded-3xl bg-card flex flex-col gap-3 shadow-sm">
            <div className={`h-12 w-12 rounded-2xl bg-muted flex items-center justify-center ${s.color}`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-3xl font-black leading-none">{s.value}</p>
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mt-2">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {displayItems.length > 0 ? (
          displayItems.slice(0, 5).map((item, i) => (
            <motion.div 
              key={item.id || i}
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              onClick={() => handleCardClick(item)}
              className="p-5 border rounded-2xl flex justify-between items-center bg-card hover:border-primary hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Briefcase size={18} />
                 </div>
                 <div>
                   <p className="font-bold text-base text-foreground">
                     {item.job?.title || item.title || "Untitled Gig"}
                   </p>
                   <p className="text-xs text-muted-foreground mt-1">
                     {new Date(item.createdAt || Date.now()).toLocaleDateString()} · {item.type || "Campus Gig"}
                   </p>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${
                  item.status?.toUpperCase() === "ACCEPTED" 
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-secondary text-muted-foreground"
                }`}>
                  {item.status?.toUpperCase() || "PENDING"}
                </span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-3xl text-muted-foreground">
            <AlertCircle className="mx-auto mb-2 opacity-20" size={40} />
            <p className="font-medium text-lg">No activity found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;