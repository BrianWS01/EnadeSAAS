import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="pt-16">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

