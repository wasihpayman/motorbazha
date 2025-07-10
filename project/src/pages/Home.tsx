import React from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../contexts/CarContext';
import { Search, Star, Shield, Users, TrendingUp, ChevronRight } from 'lucide-react';
import CarCard from '../components/CarCard';

const Home: React.FC = () => {
  const { featuredCars } = useCar();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Car
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover premium vehicles from trusted sellers worldwide
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by brand, model, or location..."
                      className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Link
                    to="/cars"
                    className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search Cars
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25,000+</h3>
              <p className="text-gray-600">Cars Sold</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Verified Listings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked premium vehicles from our trusted sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/cars"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              View All Cars
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AutoMarket?
            </h2>
            <p className="text-xl text-gray-600">
              We make buying and selling cars easy, safe, and transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                All our car listings are thoroughly verified to ensure authenticity and quality.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Experience</h3>
              <p className="text-gray-600">
                Enjoy a seamless car buying experience with our premium platform features.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Community</h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers in our trusted car marketplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Sell Your Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            List your car today and connect with thousands of potential buyers
          </p>
          <Link
            to="/post-car"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center font-semibold"
          >
            Post Your Car
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;