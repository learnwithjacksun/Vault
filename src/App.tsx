import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "@/Pages/Main";
import { ScrollToTop } from "@/Components/UI";
import { New, Login, Recover } from "@/Pages/Auth";
import { Dashboard } from "./Pages/Dashboard";
import { Single, Group, Image } from "@/Pages/Dashboard/Add";
const App = () => {
  return (
    <>
      <Toaster richColors position="top-center" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add">
          <Route path="single" element={<Single />} />
          <Route path="group" element={<Group />} />
          <Route path="image" element={<Image />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
