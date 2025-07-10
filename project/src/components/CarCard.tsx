import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../contexts/CarContext';
import { MapPin, Fuel, Calendar, Gauge, Heart } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          {car.featured && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {car.title}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(car.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center">
            <Gauge className="h-4 w-4 mr-1" />
            <span>{formatMileage(car.mileage)} miles</span>
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-1" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{car.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {car.sellerName.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600">{car.sellerName}</span>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;