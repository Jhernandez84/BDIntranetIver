import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Attendance } from "../Pages/Attendance/Attendance";
import { Forms } from "../Pages/Forms/Forms";
import { FormEntrega2 } from "../Pages/Forms/FormsEntregados";

export const MainRoutes = () => {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Forms" element={<Forms />} />
        <Route path="/CampamentoJuvenil" element={<FormEntrega2 />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};
