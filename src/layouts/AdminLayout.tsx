import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/admin/components/AdminSidebar';
export default function AdminLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
