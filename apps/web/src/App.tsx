import { useEffect, useState } from "react";
import { getHealth } from "./services/api";

function App() {
  const [message, setMessage] = useState<string>("Loading...");
  const [status, setStatus] = useState<string>("");

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

  return (
    <main>
      <h1>Puzzle Platform</h1>
      <p>Backend message: {message}</p>
      <p>Status: {status}</p>
    </main>
  );
}

export default App;
