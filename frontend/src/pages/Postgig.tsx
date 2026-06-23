import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const Postgig = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "Remote",
    compensation: "",
    type: "Short-term"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Safety check: ensure we have the user ID from the auth context or local storage
      const posterId = user?.id || localStorage.getItem("userId"); 

      const submissionData = {
        ...formData,
        posterId: posterId, // EXPLICITLY LINKING TO YOU
        skills: formData.skills.split(',').map(s => s.trim()).join(', '),
        createdAt: new Date().toISOString() // Ensuring a timestamp exists
      };

      await axios.post("http://localhost:5001/api/jobs", submissionData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Gig posted successfully!");
      
      // Delay navigation slightly to let the database breathe
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err: any) {
      console.error("Post Error:", err);
      toast.error(err.response?.data?.error || "Failed to post gig");
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gig-card">
        <h1 className="text-2xl font-bold mb-6">Post a New Opportunity</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Gig Title</label>
            <input 
              required
              className="w-full p-2 rounded-md border mt-1" 
              placeholder="e.g. Lab Assistant"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Requirements / Skills</label>
            <input 
              required
              className="w-full p-2 rounded-md border mt-1" 
              placeholder="e.g. Python, Research, Data Entry"
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Compensation</label>
              <input 
                className="w-full p-2 rounded-md border mt-1" 
                placeholder="e.g. ₹500/day"
                onChange={(e) => setFormData({...formData, compensation: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <input 
                className="w-full p-2 rounded-md border mt-1" 
                defaultValue="Remote"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea 
              required
              className="w-full p-2 rounded-md border mt-1 h-32" 
              placeholder="Describe the tasks and expectations..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Launch Gig"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Postgig;