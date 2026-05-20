import { Outlet } from 'react-router-dom';
export default function MainLayout() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Outlet />
    </div>
  );
}
