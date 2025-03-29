import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Loginpage />} />
        </Routes>
    );
};

export default AppRoutes;