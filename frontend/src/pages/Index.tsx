import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.png";
import { mockTournament } from "@/data/mockData";
import { LiveMatchWidget } from "@/components/LiveMatchWidget";
import { NextMatchCountdown } from "@/components/NextMatchCountdown";
import { PointsTablePreview } from "@/components/PointsTablePreview";
import { TopPerformers } from "@/components/TopPerformers";
import { RecentResults } from "@/components/RecentResults";
import { AnnouncementsFeed } from "@/components/AnnouncementsFeed";
import { CricketButton } from "@/components/CricketButton";
import { Trophy, ArrowRight } from "lucide-react";

const Index = () => {
  const t = mockTournament;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Cricket stadium at sunset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="container relative mx-auto px-4 pb-12 pt-16 sm:pb-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
                {t.status} · {t.season}
              </span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {t.format} · {t.overs} Overs
              </span>
            </div>
            <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
              {t.name}
            </h1>
            <p className="mb-6 max-w-lg text-base text-muted-foreground">
              {t.teams} teams competing from {t.startDate} to {t.endDate}. Follow live scores, standings, and player stats.
            </p>
            <div className="flex flex-wrap gap-3">
              <CricketButton variant="hero" size="lg">
                <Trophy className="h-4 w-4" />
                View Tournament
              </CricketButton>
              <CricketButton variant="hero-outline" size="lg">
                Fixtures
                <ArrowRight className="h-4 w-4" />
              </CricketButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - Live & Upcoming */}
          <div className="space-y-6 lg:col-span-2">
            <LiveMatchWidget />
            <NextMatchCountdown />
            <TopPerformers />
            <RecentResults />
          </div>

          {/* Right column - Standings & Announcements */}
          <div className="space-y-6">
            <PointsTablePreview />
            <AnnouncementsFeed />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 CricManager. Built for local cricket communities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
