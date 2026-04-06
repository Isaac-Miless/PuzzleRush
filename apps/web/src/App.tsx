import { useEffect, useState } from "react";
import { getHealth, runSupabaseTest } from "./services/api";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [status, setStatus] = useState("");

  const [dbStatus, setDbStatus] = useState("");
  const [dbError, setDbError] = useState("");
  const [isTestingDb, setIsTestingDb] = useState(false);

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const data = await getHealth();
        setMessage(data.message);
        setStatus(data.status);
      } catch (error) {
        console.error("Health check failed:", error);
        setMessage("Could not connect to backend");
        setStatus("error");
      }
    };

    void loadHealth();
  }, []);

  const handleSupabaseTest = async () => {
    setIsTestingDb(true);
    setDbStatus("");
    setDbError("");

    try {
      const data = await runSupabaseTest();
      setDbStatus(data.ok ? "ok" : "failed");
      setDbError(data.error ?? "");
    } catch (error) {
      console.error("Supabase test failed:", error);
      setDbStatus("error");
      setDbError("Request failed");
    } finally {
      setIsTestingDb(false);
    }
  };

  return (
    <main>
      <h1>Puzzle Platform</h1>

      <p>Backend message: {message}</p>
      <p>Status: {status}</p>

      <hr />

      <button onClick={handleSupabaseTest} disabled={isTestingDb}>
        {isTestingDb ? "Running..." : "Run Supabase Test"}
      </button>

      <p>DB Status: {dbStatus}</p>
      {dbError && <p>Error: {dbError}</p>}
    </main>
  );
}

export default App;
