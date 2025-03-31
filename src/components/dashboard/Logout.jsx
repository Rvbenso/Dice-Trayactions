import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase/SupabaseClient"

function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/")
  }
  

  return (
    <button
      onClick={logout}
      className="border-2 mr-8 border-gray-400 rounded-full px-6 py-2 text-sm font-medium hover:bg-red-200 transition cursor-pointer hover:border-red-400"  
    >
      Cerrar Sesión
    </button>
  )
}

export default LogoutButton