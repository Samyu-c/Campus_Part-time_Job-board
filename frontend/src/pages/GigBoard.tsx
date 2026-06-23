import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export default function GigBoard() {
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5001/api/jobs")
      .then(res => setGigs(Array.isArray(res.data.jobs) ? res.data.jobs : []))
      .catch(err => console.error("Board error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-20 text-center">Loading Campus Gigs...</div>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Campus Gig Board</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gigs.map((gig) => (
          <div key={gig.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{gig.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><MapPin size={14}/> {gig.location}</span>
              <span className="flex items-center gap-1"><Clock size={14}/> {new Date(gig.createdAt).toLocaleDateString()}</span>
            </div>
            {/* THIS LINK MUST MATCH YOUR ROUTE IN APP.TSX */}
           <Link 
  to={`/gigs/${gig.id}`}  // Added the 's' to match App.tsx
  className="w-full bg-primary text-white py-2 rounded-xl flex items-center justify-center gap-2 font-semibold hover:opacity-90"
>
  View Details <ArrowRight size={16}/>
</Link>
          </div>
        ))}
      </div>
    </div>
  );
}