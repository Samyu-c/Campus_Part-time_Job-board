import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Brain, Shield, ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { mockGigs } from "@/data/campusData";
import { GigCard } from "@/components/GigCard";
import { useAuth } from "@/contexts/AuthContext";

const CampusHome = () => {
  const { isAuthenticated } = useAuth();
  const openGigs = mockGigs.filter((g) => g.status === "Open").slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden px-4 py-20 md:py-28">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Campus Gig &<br />Pass Hub
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 md:text-lg">
              Find campus opportunities, get AI-matched, and manage your passes — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={isAuthenticated ? "/gigs" : "/login?signup=true"}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/gigs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Browse Gigs
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-white/5" />
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="font-display mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
            How it works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Briefcase, title: "Post & Discover Gigs", desc: "Professors and clubs post jobs. Students browse and apply with their skills.", color: "bg-primary/10 text-primary" },
              { icon: Brain, title: "AI Match Scoring", desc: "Every application gets an AI relevance score comparing your resume to the job description.", color: "bg-campus-amber/10 text-campus-amber" },
              { icon: Shield, title: "Digital Pass System", desc: "Students can request and track outpasses digitally. No more paper forms.", color: "bg-accent/10 text-accent" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gig-card text-center"
              >
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mb-2 text-base font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Gigs */}
      <section className="bg-muted/40 px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Open Gigs</h2>
              <p className="text-sm text-muted-foreground">Latest opportunities on campus</p>
            </div>
            <Link to="/gigs" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {openGigs.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Active Gigs", value: "24", icon: Briefcase },
            { label: "Students", value: "580+", icon: Users },
            { label: "AI Scores Generated", value: "1.2k", icon: Brain },
            { label: "Passes Processed", value: "340", icon: Shield },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-mono text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampusHome;
