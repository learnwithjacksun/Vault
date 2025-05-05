import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Goback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authRoutes = ["/new", "/login", "/recovery", "/security"];
  const isAuthRoute = authRoutes.includes(location.pathname);

  const handleBack = () => {
    if (isAuthRoute) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleBack} className="center h-10 w-10 bg-secondary rounded-full">
      <ChevronLeft size={24} />
    </button>
  );
};

export default Goback;
