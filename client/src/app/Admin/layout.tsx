// app/Admin/layout.tsx
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-[90vh] flex">
      <Sidebar />
      <div className="p-8 flex-1 overflow-y-scroll">{children}</div>
    </div>
  );
}