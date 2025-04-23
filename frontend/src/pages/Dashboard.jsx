import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import BetCard from "../components/BetCard";
import { supabase } from "../supabase";
import { Bell, BarChart2, Zap, ArrowRight, Menu, X, Percent, Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleManage = () => {
    navigate("/manage", { replace: true });
  }

  return (
    <div>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold">ArbitrageAlert</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                onClick={handleManage}
              >
                Manage
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <button
                className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button 
                className="block w-full px-3 py-2 text-base font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                onClick={handleManage}
              >
                Manage
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="flex flex-col gap-5 items-center justify-center mt-6">
        {bets.map((bet, index) => {
          return <BetCard key={index} bet={bet} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
