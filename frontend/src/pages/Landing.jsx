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
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16px)]">
        <h1 className="font-bold text-5xl text-center text-blue-900 animate-pulse">
          How can you lose... if you always win?
        </h1>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-around h-[calc(100vh-4rem)]">
        <div className="bg-gray-50 shadow-lg rounded-lg w-4/5 lg:w-2/5 justify-center my-5 lg:h-120">
          <h2 className="text-2xl font-bold text-blue-500 text-center p-2">
            With Arbitrage, it's all a guaranteed profit!
          </h2>
          <p className="px-5 text-sm md:text-2xl font-bold text-gray-10 py-3">
            Arbitrage retrieves the odds from every online sportsbook. It then
            compares them to find mistakes, and when it does, you're the first
            find out.
            <br /> <br />
            Whether notified via email or just through the website, Arbitrage
            scans for winners every Friday and Saturday for the NBA, NHL, and
            MLB.
            <br /> <br />
            When an opportunity is revealed, just adjust to the stake you want,
            check out the link, confirm the odds, and bet!
          </p>
        </div>
        <div className="bg-gray-50 shadow-lg rounded-lg w-4/5 lg:w-2/5 justify-center my-5 lg:h-120">
          <h2 className="text-2xl font-bold text-blue-500 text-center p-2">
            Getting setup is simple!
          </h2>
          <p className="px-5 text-sm md:text-2xl font-bold text-gray-10 py-3">
            Signup is simple and easy! Just make sure to set yourself up with an
            email you're ready to check often.
            <br />
            <br />
            To keep this up and running for everyone, we ask for a small monthly
            subscription of $5. It's easy to break even, as long you as stay on
            your toes!
            <br />
            <br />
            Keep your eye open for new changes, we're always trying to make it
            better and easier for you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
