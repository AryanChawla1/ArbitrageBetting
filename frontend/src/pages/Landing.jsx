import { useAuth } from "../context/AuthContext";
import { useState } from "react"
import { Bell, BarChart2, Zap, ArrowRight, Menu, X, Percent, Trophy } from "lucide-react"

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
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
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
                Sign Up
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
              <button className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors">
                Login
              </button>
              <button className="block w-full px-3 py-2 text-base font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                  How can you lose... if you always win?
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  With ArbitrageAlert, it's all guaranteed profits! By scanning the odds constantly, sportsbook errors can be exploited immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                    Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="px-6 py-3 text-base font-medium text-purple-600 bg-white border border-purple-600 rounded-md hover:bg-purple-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Arbitrage Dashboard"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How ArbitrageAlert Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform continously retrieves the odds from every online sportsbook to then
                compares and alert you to arbitrage betting opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Percent className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Statistical Detection</h3>
                <p className="text-gray-600">
                  Our algorithms scan multiple markets simultaneously via websocket connections to detect price
                  discrepancies as they happen. We value the odds from all sources and find the mistakes. Through calculation, we guarantee a profit.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Notifications</h3>
                <p className="text-gray-600">
                  Receive immediate email alerts when profitable opportunities are detected, allowing you to act quickly
                  before the market adjusts. We also have a dashboard to easily access all currently available opportunities.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What we offer</h3>
                <p className="text-gray-600">
                  We offer a simple and easy-to-use platform for arbitrage betting. We provide winning bets Friday and Saturday, multiple times a day for the NBA, MLB, and NHL. To keep this running, we ask for 5 dollars per month.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Landing;
