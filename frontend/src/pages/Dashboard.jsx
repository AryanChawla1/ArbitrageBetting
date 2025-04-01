import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import BetCard from "../components/BetCard";
import { supabase } from "../supabase";

function Dashboard() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:3000",
    {
      onOpen: () => console.log("connected"),
      onClose: () => console.log("disconnected"),
      onError: (event) => console.error(event),
      shouldReconnect: () => true,
      share: true,
    }
  );

  const [bets, setBets] = useState([]);

  useEffect(() => {
    if (lastMessage && readyState === 1) {
      const data = JSON.parse(lastMessage.data);
      console.log(data);
      console.log(data.length);
      setBets(data);
    }
  }, [lastMessage]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login", { replace: true });
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Arbitrage</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-white hover:bg-blue-100 text-blue-900 py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>
      <div className="flex flex-col gap-5 items-center justify-center mt-6">
        {bets.map((bet, index) => {
          return <BetCard key={index} bet={bet} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
