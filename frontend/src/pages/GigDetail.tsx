import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, MapPin, Sparkles, Brain, Send, CheckCircle, AlertCircle, UserCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [aiResult, setAiResult] = useState({ score: 0, feedback: "" });
  const [applications, setApplications] = useState<any[]>([]);

  const API_BASE = "http://localhost:5001/api";

  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const gigRes = await axios.get(`${API_BASE}/jobs`);
        const foundGig = gigRes.data.jobs?.find((g: any) => String(g.id) === String(id));
        
        if (foundGig) {
          setGig(foundGig);

          const appRes = await axios.get(`${API_BASE}/applications`, { headers });
          const allApps = Array.isArray(appRes.data) ? appRes.data : (appRes.data.applications || []);
          const relevantApps = allApps.filter((a: any) => String(a.jobId) === String(id));
          setApplications(relevantApps);

          const existingApp = relevantApps.find((a: any) => String(a.studentId) === String(user?.id));
          if (existingApp) {
            setApplied(true);
            setAiResult({ 
              score: existingApp.aiScore || 0, 
              feedback: existingApp.aiFeedback || "Application submitted." 
            });
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally { 
        setLoading(false); 
      }
    };
    if (id) fetchGigData();
  }, [id, user?.id]);

  const handleApply = async () => {
    if (!bio.trim() || !resume.trim()) {
      return toast.error("Please fill in both fields.");
    }

    setApplying(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE}/apply`, {
        jobId: id,
        resumeText: resume,
        coverNote: bio,
        studentName: user?.name
      }, { headers: { Authorization: `Bearer ${token}` } });

      setAiResult({ 
        score: res.data.aiScore || 75, 
        feedback: res.data.aiFeedback || "Applied!" 
      });
      
      setApplied(true);
      toast.success("Application Sent!");
      
      const appRes = await axios.get(`${API_BASE}/applications`, { headers: { Authorization: `Bearer ${token}` } });
      setApplications(appRes.data.filter((a: any) => String(a.jobId) === String(id)));
    } catch (err: any) {
      toast.error("Error applying.");
    } finally { 
      setApplying(false); 
    }
  };

  // --- NEW: Status Update Logic for Professors ---
  const handleStatusUpdate = async (appId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_BASE}/applications/${appId}`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setApplications(prev => prev.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ));
      
      toast.success(`Application ${newStatus.toLowerCase()}!`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <div className="p-20 text-center font-medium animate-pulse">Loading Gig Details...</div>;
  if (!gig) return <div className="p-20 text-center"><AlertCircle className="mx-auto mb-4" /><p>Gig not found.</p></div>;

  const isOwner = user && String(user.id) === String(gig.posterId);
  const isStudent = user?.role?.toUpperCase() === "STUDENT";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16}/> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-4">
           <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{gig.type || "Gig"}</Badge>
           <span className="text-lg font-bold text-primary">{gig.compensation || "Competitive"}</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {gig.location}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(gig.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1.5"><Users size={14} /> {applications.length} Applicants</span>
        </div>

        <p className="mb-8 text-muted-foreground leading-relaxed">{gig.description}</p>
        
        {/* --- STUDENT VIEW: Form --- */}
        {isAuthenticated && isStudent && !applied && (
          <div className="space-y-4 border-t pt-8 mt-4">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><Sparkles className="text-primary h-5 w-5"/> Apply Now</h3>
            <textarea placeholder="Bio..." value={bio} onChange={e => setBio(e.target.value)} className="w-full border rounded-2xl p-4 bg-background outline-none focus:ring-2 focus:ring-primary/20" rows={3} />
            <textarea placeholder="Skills..." value={resume} onChange={e => setResume(e.target.value)} className="w-full border rounded-2xl p-4 bg-background outline-none focus:ring-2 focus:ring-primary/20" rows={4} />
            <button onClick={handleApply} disabled={applying} className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
              {applying ? <Brain className="animate-spin" /> : <Send size={18} />}
              {applying ? "AI Analyzing..." : "Submit Application"}
            </button>
          </div>
        )}

        {/* --- STUDENT VIEW: Success State --- */}
        {applied && !isOwner && (
          <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
            <CheckCircle className="mx-auto text-emerald-600 mb-2 h-10 w-10" />
            <h3 className="font-bold text-emerald-900 text-lg">Applied Successfully!</h3>
            <div className="mt-3 inline-block bg-white px-4 py-2 rounded-xl shadow-sm border border-emerald-100">
               <span className="text-sm font-medium">AI Match Score: </span>
               <span className="text-lg font-black text-primary">{aiResult.score}</span>
            </div>
          </div>
        )}

        {/* --- PROFESSOR VIEW: Applicants List --- */}
        {isOwner && (
          <div className="mt-10 border-t pt-8">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Users className="text-primary h-5 w-5"/> Review Candidates</h3>
            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.sort((a,b) => (b.aiScore || 0) - (a.aiScore || 0)).map((app) => (
                  <div key={app.id} className="p-5 border rounded-2xl bg-muted/30 flex justify-between items-center group hover:border-primary/30 transition-all">
                    <div className="max-w-[60%]">
                      <div className="flex items-center gap-2 mb-1">
                        <UserCircle size={18} className="text-muted-foreground"/>
                        <span className="font-bold text-lg">{app.student?.name || app.studentName || "Anonymous"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 italic">"{app.resumeText}"</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-xl font-black text-primary leading-none">{app.aiScore}</div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Match</div>
                      </div>

                      {/* Acceptance/Rejection Buttons */}
                      {app.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                            className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            title="Reject Candidate"
                          >
                            <XCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, "ACCEPTED")}
                            className="p-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                            title="Accept Candidate"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </div>
                      ) : (
                        <Badge className={app.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3" : "bg-red-100 text-red-700 hover:bg-red-100 border-none px-3"}>
                          {app.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center border-2 border-dashed rounded-3xl text-muted-foreground">
                   <Users className="mx-auto h-10 w-10 mb-2 opacity-20" />
                   <p>No students have applied yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GigDetail;