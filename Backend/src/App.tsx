import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CampusNavbar } from "@/components/CampusNavbar";
import CampusHome from "./pages/CampusHome";
import CampusLogin from "./pages/CampusLogin";
import Dashboard from "./pages/Dashboard";
import GigBoard from "./pages/GigBoard";
import GigDetail from "./pages/GigDetail";
import MyApplications from "./pages/MyApplications";
import MyGigs from "./pages/MyGigs";
import DigitalPass from "./pages/DigitalPass";
import Postgig from "./pages/Postgig";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CampusNavbar />
          <Routes>
            <Route path="/" element={<CampusHome />} />
            <Route path="/login" element={<CampusLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-gig" element={<Postgig />} />
            <Route path="/gigs" element={<GigBoard />} />
            <Route path="/gigs/:id" element={<GigDetail />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/digital-pass" element={<DigitalPass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
