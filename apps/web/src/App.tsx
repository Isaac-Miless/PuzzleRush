import { useEffect, useState } from "react";
import { getHealth, runSupabaseTest } from "./services/api";

function App() {
  const [message, setMessage] = useState<string>("Loading...");
  const [status, setStatus] = useState<string>("");

  const [dbStatus, setDbStatus] = useState<string>(""); // new
  const [dbError, setDbError] = useState<string>(""); // new

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const data = await getHealth();
        setMessage(data.message);
        setStatus(data.status);
      } catch (error) {
        console.error(error);
        setMessage("Could not connect to backend");
        setStatus("error");
      }
    };

    void loadHealth();
  }, []);

  const handleSupabaseTest = async () => {
    try {
      const data = await runSupabaseTest();
      setDbStatus(data.success ? "ok" : "failed");
      setDbError(data.error || "");
    } catch (error) {
      console.error(error);
      setDbStatus("error");
      setDbError("Request failed");
    }
  };

  return (
    <main>
      <h1>Puzzle Platform</h1>

      <p>Backend message: {message}</p>
      <p>Status: {status}</p>

      <hr />

      <button onClick={handleSupabaseTest}>Run Supabase Test</button>

      <p>DB Status: {dbStatus}</p>
      {dbError && <p>Error: {dbError}</p>}
    </main>
  );
}

export default App;
