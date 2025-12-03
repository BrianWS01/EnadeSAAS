import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header />
        <main className="flex-1 pt-16">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

