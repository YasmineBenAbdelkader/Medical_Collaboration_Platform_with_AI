import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CaseView } from './pages/CaseView';
import { Profile } from './pages/Profile';
import { ExpertDirectory } from './pages/ExpertDirectory';
import { AIAssistant } from './pages/AIAssistant';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { NewCase } from './pages/NewCase';
import { Register } from './pages/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/case/new" element={<NewCase />} />
                  <Route path="/case/:id" element={<CaseView />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/experts" element={<ExpertDirectory />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Layout component for the main application
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/landing" />;
  }
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