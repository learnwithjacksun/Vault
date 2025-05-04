import { useLocation } from "react-router-dom";
import { Goback, ThemeToggle } from "../UI";
import { EllipsisVertical, Shield } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <header className="sticky top-0 backdrop-blur-md z-50 ">
        <nav className="h-[60px] layout flex items-center justify-between">
          {isDashboard ?  <Shield size={32} strokeWidth={3} className="text-primary" /> : <Goback />}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="center h-10 w-10 rounded-full bg-secondary">
              <EllipsisVertical size={20} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
