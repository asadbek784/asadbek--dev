import { Outlet } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar';
export default function MainLayout() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <Outlet />
    </div>
  );
}
