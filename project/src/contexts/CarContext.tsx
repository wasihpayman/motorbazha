import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Car {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Wagon';
  color: string;
  description: string;
  images: string[];
  location: string;
  sellerId: number;
  sellerName: string;
  sellerPhone: string;
  status: 'active' | 'pending' | 'sold' | 'flagged';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CarContextType {
  cars: Car[];
  featuredCars: Car[];
  getCarById: (id: number) => Car | undefined;
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCar: (id: number, updates: Partial<Car>) => void;
  deleteCar: (id: number) => void;
  searchCars: (query: string) => Car[];
  filterCars: (filters: CarFilters) => Car[];
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  location?: string;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};

// Mock data
const mockCars: Car[] = [
  {
    id: 1,
    title: 'BMW X5 M Sport - Premium SUV',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    price: 75000,
    mileage: 25000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Alpine White',
    description: 'Immaculate BMW X5 M Sport with full service history. This premium SUV offers the perfect blend of luxury and performance.',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Los Angeles, CA',
    sellerId: 1,
    sellerName: 'Mike Johnson',
    sellerPhone: '+1 (555) 123-4567',
    status: 'active',
    featured: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Tesla Model 3 - Electric Excellence',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45000,
    mileage: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Pearl White',
    description: 'Like-new Tesla Model 3 with autopilot and premium interior. Incredible efficiency and cutting-edge technology.',
    images: [
      'https://images.pexels.com/photos/9834029/pexels-photo-9834029.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/9834028/pexels-photo-9834028.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'San Francisco, CA',
    sellerId: 2,
    sellerName: 'Sarah Chen',
    sellerPhone: '+1 (555) 234-5678',
    status: 'active',
    featured: true,
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    title: 'Mercedes-Benz C-Class AMG',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    price: 58000,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Obsidian Black',
    description: 'Stunning Mercedes-Benz C-Class AMG with premium package. Luxurious interior and exceptional performance.',
    images: [
      'https://images.pexels.com/photos/3849270/pexels-photo-3849270.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3849269/pexels-photo-3849269.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'New York, NY',
    sellerId: 3,
    sellerName: 'David Wilson',
    sellerPhone: '+1 (555) 345-6789',
    status: 'active',
    featured: false,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: 4,
    title: 'Audi Q7 - Family Luxury SUV',
    brand: 'Audi',
    model: 'Q7',
    year: 2022,
    price: 68000,
    mileage: 28000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Glacier White',
    description: 'Spacious Audi Q7 perfect for families. Premium features and excellent safety ratings.',
    images: [
      'https://images.pexels.com/photos/3849267/pexels-photo-3849267.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Chicago, IL',
    sellerId: 4,
    sellerName: 'Emily Rodriguez',
    sellerPhone: '+1 (555) 456-7890',
    status: 'active',
    featured: true,
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-12T11:30:00Z'
  },
  {
    id: 5,
    title: 'Honda Civic Type R - Sports Hatchback',
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 38000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    color: 'Championship White',
    description: 'Thrilling Honda Civic Type R with track-ready performance. Manual transmission for driving enthusiasts.',
    images: [
      'https://images.pexels.com/photos/3849264/pexels-photo-3849264.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Miami, FL',
    sellerId: 5,
    sellerName: 'Alex Thompson',
    sellerPhone: '+1 (555) 567-8901',
    status: 'active',
    featured: false,
    createdAt: '2024-01-11T09:15:00Z',
    updatedAt: '2024-01-11T09:15:00Z'
  },
  {
    id: 6,
    title: 'Toyota Prius Hybrid - Eco-Friendly',
    brand: 'Toyota',
    model: 'Prius',
    year: 2021,
    price: 28000,
    mileage: 45000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Magnetic Gray',
    description: 'Reliable Toyota Prius hybrid with excellent fuel economy. Perfect for daily commuting.',
    images: [
      'https://images.pexels.com/photos/3849262/pexels-photo-3849262.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    location: 'Seattle, WA',
    sellerId: 6,
    sellerName: 'Lisa Park',
    sellerPhone: '+1 (555) 678-9012',
    status: 'active',
    featured: false,
    createdAt: '2024-01-10T13:25:00Z',
    updatedAt: '2024-01-10T13:25:00Z'
  }
];

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(mockCars);

  const featuredCars = cars.filter(car => car.featured && car.status === 'active');

  const getCarById = (id: number): Car | undefined => {
    return cars.find(car => car.id === id);
  };

  const addCar = (newCar: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const car: Car = {
      ...newCar,
      id: Date.now(),
      createdAt: now,
      updatedAt: now
    };
    setCars(prev => [car, ...prev]);
  };

  const updateCar = (id: number, updates: Partial<Car>) => {
    setCars(prev => prev.map(car => 
      car.id === id 
        ? { ...car, ...updates, updatedAt: new Date().toISOString() }
        : car
    ));
  };

  const deleteCar = (id: number) => {
    setCars(prev => prev.filter(car => car.id !== id));
  };

  const searchCars = (query: string): Car[] => {
    if (!query.trim()) return cars;
    
    const lowerQuery = query.toLowerCase();
    return cars.filter(car => 
      car.title.toLowerCase().includes(lowerQuery) ||
      car.brand.toLowerCase().includes(lowerQuery) ||
      car.model.toLowerCase().includes(lowerQuery) ||
      car.description.toLowerCase().includes(lowerQuery)
    );
  };

  const filterCars = (filters: CarFilters): Car[] => {
    return cars.filter(car => {
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.minPrice && car.price < filters.minPrice) return false;
      if (filters.maxPrice && car.price > filters.maxPrice) return false;
      if (filters.minYear && car.year < filters.minYear) return false;
      if (filters.maxYear && car.year > filters.maxYear) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    });
  };

  const value = {
    cars,
    featuredCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar,
    searchCars,
    filterCars
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};