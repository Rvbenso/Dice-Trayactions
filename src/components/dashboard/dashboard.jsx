import { useState } from "react";
import { useForm } from "react-hook-form"; //Es necesario instalar react-hook-form.
import { supabase } from "../supabase/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./Logout";
import { useEffect } from "react";

function Dashboard() {
  const [instruments, setInstruments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando
  

  useEffect(() => {
    fetchInstruments();
  }, []);

  async function fetchInstruments() {
    try {
      const { data, error } = await supabase.from("instruments").select();
      if (error) {
        throw error; // Lanza el error para manejarlo en el catch
      }
      setInstruments(data || []); // Asegúrate de que data no sea null
    } catch (err) {
      setError(err.message); // Captura el mensaje de error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  return (
    <>
      <main>
        
        <div>
          {loading && <p>Cargando...</p>} {/* Muestra un mensaje mientras carga */}
          {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Muestra el error si existe */}
          {!loading && !error && instruments.length === 0 && (
            <p>No hay instrumentos disponibles.</p>
          )} {/* Muestra un mensaje si no hay datos */}
        
        <LogoutButton />
        </div>
      </main>
    </>
  );
}

export default Dashboard;