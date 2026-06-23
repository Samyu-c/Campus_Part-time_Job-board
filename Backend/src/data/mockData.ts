// Mock data for the cricket league manager

export const mockLiveMatch = {
  id: "m1",
  matchNumber: 12,
  teamA: {
    name: "Royal Strikers",
    shortName: "RS",
    logo: "🔴",
    score: 156,
    wickets: 4,
    overs: 16.3,
    batting: true,
  },
  teamB: {
    name: "Thunder Kings",
    shortName: "TK",
    logo: "⚡",
    score: 142,
    wickets: 10,
    overs: 19.2,
    batting: false,
  },
  venue: "Central Park Ground",
  status: "live" as const,
  currentBatsman: "Arjun Sharma",
  currentBowler: "Ravi Patel",
  crr: 9.45,
  rrr: 7.71,
  target: 143,
};

export const mockPointsTable = [
  { rank: 1, team: "Royal Strikers", shortName: "RS", logo: "🔴", played: 6, won: 5, lost: 1, tied: 0, nr: 0, points: 10, nrr: "+1.245", qualified: true },
  { rank: 2, team: "Thunder Kings", shortName: "TK", logo: "⚡", played: 6, won: 4, lost: 2, tied: 0, nr: 0, points: 8, nrr: "+0.876", qualified: true },
  { rank: 3, team: "Phoenix Warriors", shortName: "PW", logo: "🔥", played: 6, won: 3, lost: 2, tied: 1, nr: 0, points: 7, nrr: "+0.312", qualified: true },
  { rank: 4, team: "Blue Hawks", shortName: "BH", logo: "🦅", played: 6, won: 3, lost: 3, tied: 0, nr: 0, points: 6, nrr: "-0.102", qualified: true },
  { rank: 5, team: "Golden Eagles", shortName: "GE", logo: "🦁", played: 5, won: 2, lost: 3, tied: 0, nr: 0, points: 4, nrr: "-0.456", qualified: false },
  { rank: 6, team: "Silver Wolves", shortName: "SW", logo: "🐺", played: 5, won: 1, lost: 4, tied: 0, nr: 0, points: 2, nrr: "-1.120", qualified: false },
];

export const mockTopRunScorers = [
  { rank: 1, name: "Arjun Sharma", team: "Royal Strikers", runs: 342, innings: 6, avg: 57.00, sr: 148.2, cap: "orange" },
  { rank: 2, name: "Vikram Singh", team: "Thunder Kings", runs: 298, innings: 6, avg: 49.67, sr: 135.5, cap: null },
  { rank: 3, name: "Rohan Mehta", team: "Phoenix Warriors", runs: 276, innings: 6, avg: 46.00, sr: 142.1, cap: null },
];

export const mockTopWicketTakers = [
  { rank: 1, name: "Ravi Patel", team: "Thunder Kings", wickets: 14, innings: 6, avg: 15.2, econ: 6.8, cap: "purple" },
  { rank: 2, name: "Amir Khan", team: "Royal Strikers", wickets: 11, innings: 6, avg: 18.5, econ: 7.2, cap: null },
  { rank: 3, name: "Suresh Raina Jr", team: "Blue Hawks", wickets: 10, innings: 5, avg: 20.1, econ: 7.8, cap: null },
];

export const mockRecentResults = [
  { id: "r1", teamA: "Royal Strikers", teamAScore: "186/4", teamB: "Golden Eagles", teamBScore: "162/8", result: "Royal Strikers won by 24 runs", date: "Feb 28, 2026" },
  { id: "r2", teamA: "Thunder Kings", teamAScore: "145/10", teamB: "Silver Wolves", teamBScore: "98/10", result: "Thunder Kings won by 47 runs", date: "Feb 27, 2026" },
  { id: "r3", teamA: "Phoenix Warriors", teamAScore: "172/6", teamB: "Blue Hawks", teamBScore: "175/5", result: "Blue Hawks won by 5 wickets", date: "Feb 26, 2026" },
];

export const mockAnnouncements = [
  { id: "a1", title: "Semi-final schedule released", content: "Semi-finals on March 8 & 9 at Central Park Ground", date: "Mar 1, 2026", type: "info" as const },
  { id: "a2", title: "Ground change for Match #14", content: "Match #14 moved to Riverside Cricket Ground due to maintenance", date: "Feb 28, 2026", type: "warning" as const },
  { id: "a3", title: "Rain policy updated", content: "Minimum 5 overs required for a valid match result", date: "Feb 25, 2026", type: "info" as const },
];

export const mockTournament = {
  name: "Colony Premier League 2026",
  season: "Season 3",
  format: "Group + Knockout",
  overs: 20,
  teams: 8,
  status: "Ongoing" as const,
  startDate: "Feb 15, 2026",
  endDate: "Mar 15, 2026",
};

export const mockNextMatch = {
  teamA: "Phoenix Warriors",
  teamB: "Golden Eagles",
  date: "Mar 3, 2026",
  time: "4:00 PM",
  venue: "Central Park Ground",
  matchNumber: 13,
};
