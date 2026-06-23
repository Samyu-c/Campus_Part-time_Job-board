export type UserRole = "student" | "professor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  bio?: string;
  resume?: string;
  skills?: string[];
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  payType: "Paid" | "Unpaid" | "Stipend" | "Credit-Based";
  payAmount?: string;
  postedBy: string;
  postedByName: string;
  department: string;
  status: "Open" | "Closed" | "In Progress";
  deadline: string;
  applicants: number;
  createdAt: string;
  type: "Research" | "Club" | "Admin" | "Tutoring" | "Event";
}

export interface Application {
  id: string;
  gigId: string;
  gigTitle: string;
  studentId: string;
  studentName: string;
  studentDept: string;
  bio: string;
  resume: string;
  skills: string[];
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  matchScore: number;
  matchAnalysis: string;
  appliedAt: string;
}

export interface OutPass {
  id: string;
  studentId: string;
  reason: string;
  destination: string;
  dateOut: string;
  dateReturn: string;
  status: "Pending" | "Approved" | "Rejected";
  approvedBy?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "prof-1",
    name: "Dr. Ananya Sharma",
    email: "ananya@campus.edu",
    role: "professor",
    department: "Computer Science",
    bio: "Professor of Machine Learning and AI",
  },
  {
    id: "prof-2",
    name: "Prof. Rahul Mehta",
    email: "rahul@campus.edu",
    role: "professor",
    department: "Electrical Engineering",
    bio: "Head of Robotics Lab",
  },
  {
    id: "stu-1",
    name: "Priya Patel",
    email: "priya@campus.edu",
    role: "student",
    department: "Computer Science",
    bio: "Final year CS student passionate about web dev and ML. Built 3 full-stack projects.",
    resume: "Skills: React, Node.js, Python, TensorFlow. Projects: E-commerce platform, ML-based recommendation engine, Campus event manager. GPA: 3.8/4.0",
    skills: ["React", "Node.js", "Python", "TensorFlow", "SQL"],
  },
  {
    id: "stu-2",
    name: "Arjun Singh",
    email: "arjun@campus.edu",
    role: "student",
    department: "Mechanical Engineering",
    bio: "3rd year Mech student with a minor in CS. Love building hardware+software projects.",
    resume: "Skills: C++, Arduino, SolidWorks, MATLAB, Python. Projects: Autonomous drone, IoT weather station. GPA: 3.5/4.0",
    skills: ["C++", "Arduino", "SolidWorks", "MATLAB", "Python"],
  },
  {
    id: "stu-3",
    name: "Kavya Nair",
    email: "kavya@campus.edu",
    role: "student",
    department: "Design",
    bio: "UI/UX design student. Freelance designer with experience in mobile and web apps.",
    resume: "Skills: Figma, Adobe XD, Illustrator, HTML/CSS, Framer. Portfolio: 12+ client projects. GPA: 3.9/4.0",
    skills: ["Figma", "Adobe XD", "Illustrator", "HTML/CSS", "Framer"],
  },
];

// Mock Gigs
export const mockGigs: Gig[] = [
  {
    id: "gig-1",
    title: "ML Research Assistant — NLP Lab",
    description: "Assist in building a sentiment analysis model for regional languages. Must know Python, PyTorch, and NLP fundamentals. 10 hrs/week for 3 months.",
    skillsRequired: ["Python", "PyTorch", "NLP", "Machine Learning"],
    payType: "Stipend",
    payAmount: "₹8,000/month",
    postedBy: "prof-1",
    postedByName: "Dr. Ananya Sharma",
    department: "Computer Science",
    status: "Open",
    deadline: "2026-03-20",
    applicants: 12,
    createdAt: "2026-02-28",
    type: "Research",
  },
  {
    id: "gig-2",
    title: "Robotics Club — Web Portal Developer",
    description: "Build the official website for Robotics Club. Must include event calendar, member directory, and project showcase. React preferred.",
    skillsRequired: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    payType: "Credit-Based",
    postedBy: "prof-2",
    postedByName: "Prof. Rahul Mehta",
    department: "Electrical Engineering",
    status: "Open",
    deadline: "2026-03-15",
    applicants: 8,
    createdAt: "2026-02-25",
    type: "Club",
  },
  {
    id: "gig-3",
    title: "Campus Fest Poster & Banner Design",
    description: "Design posters, banners, and social media creatives for the annual college fest 'TechnoVista 2026'. Need 15+ deliverables.",
    skillsRequired: ["Figma", "Illustrator", "Photoshop", "Graphic Design"],
    payType: "Paid",
    payAmount: "₹5,000 fixed",
    postedBy: "prof-1",
    postedByName: "Dr. Ananya Sharma",
    department: "Cultural Committee",
    status: "Open",
    deadline: "2026-03-10",
    applicants: 20,
    createdAt: "2026-02-20",
    type: "Event",
  },
  {
    id: "gig-4",
    title: "Data Entry — Library Digital Archive",
    description: "Help digitize old library records into the new management system. Basic computer skills required. Flexible hours.",
    skillsRequired: ["MS Excel", "Data Entry", "Attention to Detail"],
    payType: "Unpaid",
    postedBy: "prof-2",
    postedByName: "Prof. Rahul Mehta",
    department: "Library",
    status: "Open",
    deadline: "2026-04-01",
    applicants: 5,
    createdAt: "2026-03-01",
    type: "Admin",
  },
  {
    id: "gig-5",
    title: "Python Tutor for First Years",
    description: "Conduct weekly 2-hour Python programming tutorials for first-year students. Must have strong teaching skills and Python expertise.",
    skillsRequired: ["Python", "Teaching", "Data Structures", "Algorithms"],
    payType: "Stipend",
    payAmount: "₹3,000/month",
    postedBy: "prof-1",
    postedByName: "Dr. Ananya Sharma",
    department: "Computer Science",
    status: "Open",
    deadline: "2026-03-25",
    applicants: 15,
    createdAt: "2026-03-02",
    type: "Tutoring",
  },
  {
    id: "gig-6",
    title: "IoT Sensor Calibration Assistant",
    description: "Assist in calibrating IoT sensors for the smart campus project. Electronics knowledge required. Lab work 3 days/week.",
    skillsRequired: ["Arduino", "IoT", "Electronics", "C++"],
    payType: "Stipend",
    payAmount: "₹6,000/month",
    postedBy: "prof-2",
    postedByName: "Prof. Rahul Mehta",
    department: "Electrical Engineering",
    status: "In Progress",
    deadline: "2026-03-18",
    applicants: 6,
    createdAt: "2026-02-15",
    type: "Research",
  },
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: "app-1",
    gigId: "gig-1",
    gigTitle: "ML Research Assistant — NLP Lab",
    studentId: "stu-1",
    studentName: "Priya Patel",
    studentDept: "Computer Science",
    bio: "Final year CS student passionate about web dev and ML. Built 3 full-stack projects.",
    resume: "Skills: React, Node.js, Python, TensorFlow. Projects: E-commerce platform, ML-based recommendation engine, Campus event manager. GPA: 3.8/4.0",
    skills: ["React", "Node.js", "Python", "TensorFlow", "SQL"],
    status: "Pending",
    matchScore: 82,
    matchAnalysis: "Strong Python and ML background with TensorFlow experience. Has built ML projects. Lacks specific NLP and PyTorch experience but transferable skills are solid. Recommended for interview.",
    appliedAt: "2026-03-01",
  },
  {
    id: "app-2",
    gigId: "gig-1",
    gigTitle: "ML Research Assistant — NLP Lab",
    studentId: "stu-2",
    studentName: "Arjun Singh",
    studentDept: "Mechanical Engineering",
    bio: "3rd year Mech student with a minor in CS. Love building hardware+software projects.",
    resume: "Skills: C++, Arduino, SolidWorks, MATLAB, Python. Projects: Autonomous drone, IoT weather station. GPA: 3.5/4.0",
    skills: ["C++", "Arduino", "SolidWorks", "MATLAB", "Python"],
    status: "Rejected",
    matchScore: 35,
    matchAnalysis: "Has Python knowledge but no ML/NLP background. Primary domain is mechanical/hardware. Skills don't align well with NLP research requirements.",
    appliedAt: "2026-03-01",
  },
  {
    id: "app-3",
    gigId: "gig-2",
    gigTitle: "Robotics Club — Web Portal Developer",
    studentId: "stu-1",
    studentName: "Priya Patel",
    studentDept: "Computer Science",
    bio: "Final year CS student passionate about web dev and ML. Built 3 full-stack projects.",
    resume: "Skills: React, Node.js, Python, TensorFlow. Projects: E-commerce platform, ML-based recommendation engine, Campus event manager. GPA: 3.8/4.0",
    skills: ["React", "Node.js", "Python", "TensorFlow", "SQL"],
    status: "Accepted",
    matchScore: 91,
    matchAnalysis: "Excellent match. Strong React skills with full-stack experience. Has built similar projects (Campus event manager). TypeScript and Tailwind experience implied from React projects. Top candidate.",
    appliedAt: "2026-02-27",
  },
  {
    id: "app-4",
    gigId: "gig-3",
    gigTitle: "Campus Fest Poster & Banner Design",
    studentId: "stu-3",
    studentName: "Kavya Nair",
    studentDept: "Design",
    bio: "UI/UX design student. Freelance designer with experience in mobile and web apps.",
    resume: "Skills: Figma, Adobe XD, Illustrator, HTML/CSS, Framer. Portfolio: 12+ client projects. GPA: 3.9/4.0",
    skills: ["Figma", "Adobe XD", "Illustrator", "HTML/CSS", "Framer"],
    status: "Accepted",
    matchScore: 88,
    matchAnalysis: "Design-focused student with Figma and Illustrator expertise. 12+ client projects show real-world experience. Missing Photoshop explicitly but Illustrator skills transfer well.",
    appliedAt: "2026-02-22",
  },
  {
    id: "app-5",
    gigId: "gig-6",
    gigTitle: "IoT Sensor Calibration Assistant",
    studentId: "stu-2",
    studentName: "Arjun Singh",
    studentDept: "Mechanical Engineering",
    bio: "3rd year Mech student with a minor in CS. Love building hardware+software projects.",
    resume: "Skills: C++, Arduino, SolidWorks, MATLAB, Python. Projects: Autonomous drone, IoT weather station. GPA: 3.5/4.0",
    skills: ["C++", "Arduino", "SolidWorks", "MATLAB", "Python"],
    status: "Completed",
    matchScore: 95,
    matchAnalysis: "Perfect fit. Arduino and C++ expertise with IoT project experience (weather station). Mechanical engineering background adds value for sensor hardware. Ideal candidate.",
    appliedAt: "2026-02-16",
  },
];

// Mock OutPasses
export const mockOutPasses: OutPass[] = [
  {
    id: "pass-1",
    studentId: "stu-1",
    reason: "Family function",
    destination: "Mumbai",
    dateOut: "2026-03-08",
    dateReturn: "2026-03-10",
    status: "Approved",
    approvedBy: "Dr. Ananya Sharma",
  },
  {
    id: "pass-2",
    studentId: "stu-1",
    reason: "Hackathon at IIT Delhi",
    destination: "New Delhi",
    dateOut: "2026-03-15",
    dateReturn: "2026-03-17",
    status: "Pending",
  },
  {
    id: "pass-3",
    studentId: "stu-2",
    reason: "Medical appointment",
    destination: "City Hospital",
    dateOut: "2026-03-05",
    dateReturn: "2026-03-05",
    status: "Approved",
    approvedBy: "Prof. Rahul Mehta",
  },
  {
    id: "pass-4",
    studentId: "stu-3",
    reason: "Design conference",
    destination: "Bangalore",
    dateOut: "2026-03-20",
    dateReturn: "2026-03-22",
    status: "Rejected",
  },
];

// Helper
export function getScoreColor(score: number): string {
  if (score >= 70) return "score-high";
  if (score >= 40) return "score-mid";
  return "score-low";
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return "Excellent Match";
  if (score >= 70) return "Good Match";
  if (score >= 50) return "Fair Match";
  if (score >= 30) return "Weak Match";
  return "Poor Match";
}
