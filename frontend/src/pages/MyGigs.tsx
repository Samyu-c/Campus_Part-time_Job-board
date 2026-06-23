import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyGigs() {
  const { user } = useAuth();
  const [myGigs, setMyGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/api/jobs")
      .then(res => {
        const jobs = Array.isArray(res.data.jobs) ? res.data.jobs : [];
        // Match by posterId (ensuring string comparison)
        setMyGigs(jobs.filter((j: any) => String(j.posterId) === String(user?.id)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return <div className="p-20 text-center">Loading your gigs...</div>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Your Posted Gigs</h1>
      <div className="space-y-4">
        {myGigs.length === 0 ? (
          <div className="p-10 border-2 border-dashed rounded-xl text-center text-muted-foreground">
            You haven't posted any gigs yet.
          </div>
        ) : (
          myGigs.map(gig => (
            <div 
              key={gig.id} 
              onClick={() => navigate(`/gig/${gig.id}`)}
              className="p-4 border rounded-xl flex justify-between items-center bg-card hover:bg-muted/50 cursor-pointer"
            >
              <div>
                <h3 className="font-bold">{gig.title}</h3>
                <p className="text-xs text-muted-foreground">{new Date(gig.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full">
                {gig.status || "OPEN"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}