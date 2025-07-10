import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCar } from '../contexts/CarContext';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Car, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { cars, updateCar, deleteCar } = useCar();
  const [activeTab, setActiveTab] = useState('overview');

  const userCars = cars.filter(car => car.sellerId === user?.id);
  const activeCars = userCars.filter(car => car.status === 'active');
  const pendingCars = userCars.filter(car => car.status === 'pending');
  const soldCars = userCars.filter(car => car.status === 'sold');

  const totalViews = userCars.reduce((sum, car) => sum + (Math.floor(Math.random() * 1000) + 100), 0);
  const totalInquiries = userCars.reduce((sum, car) => sum + (Math.floor(Math.random() * 20) + 5), 0);

  const handleStatusUpdate = (carId: number, newStatus: 'active' | 'pending' | 'sold' | 'flagged') => {
    updateCar(carId, { status: newStatus });
  };

  const handleDelete = (carId: number) => {
    if (window.confirm('Are you sure you want to delete this car listing?')) {
      deleteCar(carId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'sold': return <DollarSign className="h-4 w-4" />;
      case 'flagged': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cars</p>
                <p className="text-2xl font-bold text-gray-900">{userCars.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{activeCars.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{totalInquiries}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('cars')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'cars'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Cars ({userCars.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/post-car"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PlusCircle className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Post New Car</p>
                    <p className="text-sm text-gray-600">Add a new car listing</p>
                  </div>
                </Link>
                <Link
                  to="/subscription"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Upgrade Plan</p>
                    <p className="text-sm text-gray-600">Get more features</p>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Edit Profile</p>
                    <p className="text-sm text-gray-600">Update your information</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {userCars.slice(0, 5).map((car) => (
                  <div key={car.id} className="flex items-center space-x-4">
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{car.title}</p>
                      <p className="text-sm text-gray-600">{formatPrice(car.price)}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                      {car.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">My Car Listings</h2>
              <Link
                to="/post-car"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Car
              </Link>
            </div>

            {userCars.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars listed yet</h3>
                <p className="text-gray-600 mb-6">Start by posting your first car listing</p>
                <Link
                  to="/post-car"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Post Your First Car
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userCars.map((car) => (
                        <tr key={car.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={car.images[0]}
                                alt={car.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{car.title}</div>
                                <div className="text-sm text-gray-500">{car.year} • {car.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(car.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
                              {getStatusIcon(car.status)}
                              <span className="ml-1 capitalize">{car.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Math.floor(Math.random() * 1000) + 100}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <Link
                              to={`/cars/${car.id}`}
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                            <button
                              onClick={() => handleStatusUpdate(car.id, car.status === 'active' ? 'pending' : 'active')}
                              className="text-green-600 hover:text-green-900 inline-flex items-center"
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(car.id)}
                              className="text-red-600 hover:text-red-900 inline-flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Listings by Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active</span>
                    <span className="text-sm font-medium">{activeCars.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium">{pendingCars.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sold</span>
                    <span className="text-sm font-medium">{soldCars.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="text-sm font-medium">{totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Views per Car</span>
                    <span className="text-sm font-medium">
                      {userCars.length > 0 ? Math.round(totalViews / userCars.length) : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Inquiries</span>
                    <span className="text-sm font-medium">{totalInquiries}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;