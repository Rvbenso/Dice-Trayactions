import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Dashboardpage from "./pages/Dashboardpage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
            <Route path="/dashboard" element={<Dashboardpage />} />
        </Routes>
    );
};

export default AppRoutes;