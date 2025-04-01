import { useAuth } from "../context/AuthContext";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center h-16 fixed top-0 left-0 w-full z-10">
        <h1 className="text-lg font-bold">Arbitrage</h1>
        <div>
          <button
            type="button"
            className="bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 mx-2 rounded"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-white hover:bg-blue-100 text-blue-900 py-2 px-4 mx-2 rounded"
          >
            Signup
          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <h1 className="font-bold text-5xl text-center text-blue-900 animate-pulse">
          How can you lose... if you always win?
        </h1>
        <div className="absolute bottom-4 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-around h-[calc(100vh-4rem)]">
        <div className="bg-gray-200 shadow-lg rounded-lg w-2/5 justify-center">
          <h2>With Arbitrage, it's all a guaranteed profit</h2>
          <p>All you got to do is place the bet.</p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg w-2/5 justify-center">
          <h2>With Arbitrage, it's all a guaranteed profit</h2>
          <p>All you got to do is place the bet.</p>
        </div>
      </div>
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p>tst</p>
      </div>
    </div>
  );
}

export default Landing;
