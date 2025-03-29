import "./App.css"
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './routes'
import Pruebita from "./components/pruebabd/pruebita";
import { realTime } from './components/supabase/Realtime';


function App() {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}
export default App;