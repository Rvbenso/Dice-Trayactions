import { useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";

function Pruebita() {
  const [instruments, setInstruments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstruments();
  }, []);

  async function fetchInstruments() {
    const { data, error } = await supabase.from("instruments").select();
    if (error) {
      setError(error.message);
    } else {
      setInstruments(data);
    }
  }

  return (
    <div>
      <h1>Lista de Instrumentos</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>{instrument.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pruebita;