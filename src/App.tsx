import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SocialPlatform from "./components/SocialPlatform";
import ReelsPage from "./pages/ReelsPage";
import Settings from "./pages/Settings";
import MarketingAcademy from "./pages/MarketingAcademy";
import MarketingStrategy from "./pages/MarketingStrategy";
import SellingAlgorithm from "./pages/SellingAlgorithm";
import TechMarketing from "./pages/TechMarketing";
import AIChatPage from "./pages/AIChatPage";
import ChatRoom from "./pages/ChatRoom";
import CopywritingLab from "./pages/CopywritingLab";
import LuxuryPost from "./pages/LuxuryPost";
import MarketplaceShowcase from "./pages/MarketplaceShowcase";
import DropshippingHub from "./pages/Dropshipping";
import NotFound from "./pages/NotFound";
import KhabblloPay from "./pages/KhabblloPay";
import VillagesPage from "./pages/VillagesPage";
import DartAcademy from "./pages/DartAcademy";
import ErrorBoundary from "./components/ErrorBoundary";
import HealthMonitor from "./components/HealthMonitor";
import AIChat from "./components/AIChat";
import { AuthProvider } from "./lib/AuthContext";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <HealthMonitor />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/social" element={<SocialPlatform />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/academy" element={<MarketingAcademy />} />
                <Route path="/strategy" element={<MarketingStrategy />} />
                <Route path="/algorithm" element={<SellingAlgorithm />} />
                <Route path="/tech-showcase" element={<TechMarketing />} />
                <Route path="/chat" element={<AIChatPage />} />
                <Route path="/community" element={<ChatRoom />} />
                <Route path="/copy-refiner" element={<CopywritingLab />} />
                <Route path="/luxury-post" element={<LuxuryPost />} />
                <Route path="/marketplace" element={<MarketplaceShowcase />} />
                <Route path="/marketplace-showcase" element={<MarketplaceShowcase />} />
                <Route path="/dropshipping" element={<DropshippingHub />} />
                <Route path="/pay" element={<KhabblloPay />} />
                <Route path="/villages" element={<VillagesPage />} />
                <Route path="/dart-academy" element={<DartAcademy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <AIChat />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
