import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { statisticsData, recentActivity } from '../../mocks/statistics';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20bright%20university%20campus%20hallway%20with%20students%20walking%20in%20soft%20natural%20light%20clean%20minimalist%20architecture%20with%20white%20walls%20and%20large%20windows%20creating%20an%20airy%20welcoming%20atmosphere%20professional%20photography%20style&width=1920&height=1080&seq=hero1&orientation=landscape"
            alt="Campus Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Lost Something?<br />We'll Help You Find It
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            iFound is your trusted lost and found management system. Report lost items, browse found items, and reunite with your belongings quickly and easily.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/report-lost"
              className="px-8 py-4 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <i className="ri-search-line mr-2"></i>
              Report Lost Item
            </Link>
            <Link
              to="/report-found"
              className="px-8 py-4 bg-white text-teal-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <i className="ri-hand-heart-line mr-2"></i>
              Report Found Item
            </Link>
            <Link
              to="/browse-items"
              className="px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <i className="ri-grid-line mr-2"></i>
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Helping our community reconnect with their belongings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-search-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{statisticsData.totalLost}</h3>
              <p className="text-gray-600 font-medium">Lost Items Reported</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-hand-heart-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{statisticsData.totalFound}</h3>
              <p className="text-gray-600 font-medium">Found Items Registered</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-checkbox-circle-line text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{statisticsData.matchedItems}</h3>
              <p className="text-gray-600 font-medium">Successful Matches</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-time-line text-3xl text-orange-600"></i>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{statisticsData.pendingClaims}</h3>
              <p className="text-gray-600 font-medium">Pending Claims</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to reunite with your belongings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-list-3-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Report</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit a detailed report of your lost item or register a found item with photos and descriptions to help with identification.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-search-2-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Match</h3>
              <p className="text-gray-600 leading-relaxed">
                Our system automatically searches for potential matches between lost and found items based on descriptions and categories.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-hand-coin-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Reunite</h3>
              <p className="text-gray-600 leading-relaxed">
                Get notified when a match is found, communicate through our secure messaging system, and arrange for item retrieval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-lg text-gray-600">Latest lost and found reports from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentActivity.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    item.type === 'lost' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    item.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : item.status === 'matched'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.itemName}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <i className="ri-price-tag-3-line mr-1"></i>
                  {item.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <i className="ri-map-pin-line mr-1"></i>
                  {item.location}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="ri-calendar-line mr-1"></i>
                  {item.date}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/browse-items"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all whitespace-nowrap"
            >
              View All Items
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-teal-50 mb-10">
            Join our community and help make lost items a thing of the past. Report your lost or found items today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/report-lost"
              className="px-8 py-4 bg-white text-teal-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap"
            >
              Report Lost Item
            </Link>
            <Link
              to="/report-found"
              className="px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all shadow-lg whitespace-nowrap"
            >
              Report Found Item
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
