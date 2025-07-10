import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useReceipt } from '../contexts/ReceiptContext';
import { Check, Star, Crown, Zap, Shield, Upload } from 'lucide-react';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const { uploadReceipt } = useReceipt();
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'receipt'>('card');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      duration: 'month',
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      popular: false,
      features: [
        'Post up to 2 cars',
        'Basic listing features',
        'Email support',
        'Standard visibility'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      duration: 'month',
      icon: <Star className="h-8 w-8 text-purple-600" />,
      popular: true,
      features: [
        'Post up to 10 cars',
        'Featured listings',
        'Priority support',
        'Advanced analytics',
        'Social media promotion',
        'Premium badge'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 59,
      duration: 'month',
      icon: <Crown className="h-8 w-8 text-gold-600" />,
      popular: false,
      features: [
        'Unlimited car posts',
        'Top listing priority',
        'Dedicated support',
        'Advanced analytics',
        'Professional photography',
        'Marketing tools',
        'API access'
      ]
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const handleSubscribe = () => {
    // In a real app, this would process the payment
    alert('Subscription processed successfully!');
  };

  const handleUploadReceipt = () => {
    if (receiptFile && user && selectedPlan !== 'basic') {
      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      if (selectedPlanData) {
        // Create a mock file URL for demo
        const fileUrl = URL.createObjectURL(receiptFile);
        
        uploadReceipt({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          planType: selectedPlan as 'pro' | 'premium',
          planPrice: selectedPlanData.price,
          receiptFile: fileUrl,
          fileName: receiptFile.name,
          fileSize: receiptFile.size
        });
        
        alert('Receipt uploaded successfully! Your subscription will be activated after verification.');
        setReceiptFile(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock premium features and grow your car selling business
          </p>
        </div>

        {/* Current Plan Status */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Current Plan</p>
                  <p className="text-sm text-gray-600">
                    {user.subscriptionStatus === 'active' ? 'Pro Plan' : 'Basic Plan'}
                  </p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                user.subscriptionStatus === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {plan.name}
                </h3>
                
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        {selectedPlan !== 'basic' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            {/* Payment Method Toggle */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('receipt')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  paymentMethod === 'receipt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upload Receipt
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      placeholder="123 Main St, City, State 12345"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Receipt Upload */}
            {paymentMethod === 'receipt' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Payment Instructions</h3>
                  <p className="text-sm text-blue-800 mb-4">
                    Please make your payment to our bank account and upload the receipt for verification.
                  </p>
                  <div className="text-sm text-blue-800">
                    <p><strong>Bank:</strong> AutoMarket Bank</p>
                    <p><strong>Account:</strong> 1234567890</p>
                    <p><strong>Amount:</strong> ${plans.find(p => p.id === selectedPlan)?.price}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Receipt
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 10MB)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  {receiptFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {receiptFile.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={paymentMethod === 'card' ? handleSubscribe : handleUploadReceipt}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {paymentMethod === 'card' ? 'Subscribe Now' : 'Upload Receipt'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;