import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

// Pages publiques
import { LandingPage } from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/register';
import { Blog } from './pages/Blog';
import { ContactUs } from './pages/ContactUs';

// Pages dashboard
import { DashboardMedecin } from './pages/DashboardMedecin';
import { DashboardExpert } from './pages/DashboardExpert';
import { DashboardAdmin } from './pages/DashboardAdmin';

// Pages communes
import { Profile } from './pages/Profile';
import { Discussions } from './pages/Discussions';
import { AIAssistant } from './pages/AIAssistant';
import { ExpertDirectory } from './pages/ExpertDirectory';
import { NewCase } from './pages/NewCase';
import { CaseView } from './pages/CaseView';
import { MyPubs } from './pages/MyPubs';
import { GestionUtilisateurs } from './pages/GestionUtilisateurs';

// Pages fictives
const Stats = () => <div>📊 Statistiques</div>;
const Params = () => <div>⚙️ Paramètres</div>;
const Help = () => <div>❓ Aide et assistance</div>;

/* ----------------------------------------
   🧱 Layout principal avec Header + Sidebar
   (toujours visible même sans connexion)
---------------------------------------- */
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

/* ----------------------------------------
   🧭 Définition des routes
---------------------------------------- */
const AppRoutes = () => (
  <Routes>
    {/* 🌐 Routes publiques */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/home" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/contact" element={<ContactUs />} />

    {/* 🩺 Dashboards par rôle */}
    <Route
      path="/medecin/dashboard"
      element={
        <AppLayout>
          <DashboardMedecin />
        </AppLayout>
      }
    />
    <Route
      path="/expert/dashboard"
      element={
        <AppLayout>
          <DashboardExpert />
        </AppLayout>
      }
    />
    <Route
      path="/admin/dashboard"
      element={
        <AppLayout>
          <GestionUtilisateurs />
        </AppLayout>
      }
    />

    {/* ⚙️ Autres pages internes */}
    <Route
      path="/profile"
      element={
        <AppLayout>
          <Profile />
        </AppLayout>
      }
    />
    <Route
      path="/discussions"
      element={
        <AppLayout>
          <Discussions />
        </AppLayout>
      }
    />
    <Route
      path="/ai-assistant"
      element={
        <AppLayout>
          <AIAssistant />
        </AppLayout>
      }
    />
    <Route
      path="/experts"
      element={
        <AppLayout>
          <ExpertDirectory />
        </AppLayout>
      }
    />
    <Route
      path="/case/new"
      element={
        <AppLayout>
          <NewCase />
        </AppLayout>
      }
    />
    <Route
      path="/case/:id"
      element={
        <AppLayout>
          <CaseView />
        </AppLayout>
      }
    />
    <Route
      path="/pubs"
      element={
        <AppLayout>
          <MyPubs />
        </AppLayout>
      }
    />
    <Route
      path="/stats"
      element={
        <AppLayout>
          <Stats />
        </AppLayout>
      }
    />
    <Route
      path="/params"
      element={
        <AppLayout>
          <Params />
        </AppLayout>
      }
    />
    <Route
      path="/help"
      element={
        <AppLayout>
          <Help />
        </AppLayout>
      }
    />

    {/* 🧭 Route par défaut */}
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>
);

/* ----------------------------------------
   🧩 Application principale
---------------------------------------- */
const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
