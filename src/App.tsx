import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Loader from './components/ui/Loader';
import ProtectedRoute from './admin/components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./admin/pages/Login'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const HeroEditor = lazy(() => import('./admin/pages/HeroEditor'));
const AboutEditor = lazy(() => import('./admin/pages/AboutEditor'));
const SkillsManager = lazy(() => import('./admin/pages/SkillsManager'));
const ProjectsManager = lazy(() => import('./admin/pages/ProjectsManager'));
const SocialEditor = lazy(() => import('./admin/pages/SocialEditor'));
const SEOEditor = lazy(() => import('./admin/pages/SEOEditor'));

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/hero" element={<HeroEditor />} />
              <Route path="/admin/about" element={<AboutEditor />} />
              <Route path="/admin/skills" element={<SkillsManager />} />
              <Route path="/admin/projects" element={<ProjectsManager />} />
              <Route path="/admin/social" element={<SocialEditor />} />
              <Route path="/admin/seo" element={<SEOEditor />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
