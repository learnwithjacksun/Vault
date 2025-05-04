import { Header } from "@/Components/Dashboard";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <main className="layout mt-2 space-y-4 min-h-[calc(100vh-60px)]">
        {children}
        </main>
    </>
  );
};

export default DashboardLayout