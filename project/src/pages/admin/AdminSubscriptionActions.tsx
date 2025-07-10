import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useReceipt } from '../../contexts/ReceiptContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Settings,
  User,
  Calendar,
  AlertTriangle,
  Shield
} from 'lucide-react';

const AdminSubscriptionActions: React.FC = () => {
  const { user } = useAuth();
  const { subscriptionActions, manualSubscriptionAction } = useReceipt();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [showManualActionModal, setShowManualActionModal] = useState(false);
  const [manualAction, setManualAction] = useState({
    userId: '',
    userName: '',
    action: 'activate',
    details: ''
  });

  // Mock users for manual actions
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 5, name: 'David Brown', email: 'david@example.com' }
  ];

  const filteredActions = subscriptionActions.filter(action => {
    const matchesSearch = action.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || action.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleManualAction = () => {
    if (manualAction.userId && manualAction.details.trim() && user) {
      const selectedUser = users.find(u => u.id === Number(manualAction.userId));
      if (selectedUser) {
        manualSubscriptionAction(
          Number(manualAction.userId),
          manualAction.action,
          user.name,
          manualAction.details
        );
        setShowManualActionModal(false);
        setManualAction({
          userId: '',
          userName: '',
          action: 'activate',
          details: ''
        });
      }
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approve':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'reject':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'activate':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'extend':
        return <Clock className="h-4 w-4 text-purple-600" />;
      case 'revoke':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'approve':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </span>
        );
      case 'reject':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      case 'activate':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activated
          </span>
        );
      case 'extend':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock className="h-3 w-3 mr-1" />
            Extended
          </span>
        );
      case 'revoke':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Revoked
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {action}
          </span>
        );
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Actions & Audit Log</h1>
          <p className="text-gray-600 mt-2">Track all subscription-related actions and perform manual adjustments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Actions</p>
                <p className="text-2xl font-bold text-gray-900">{subscriptionActions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approvals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptionActions.filter(a => a.action === 'approve').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejections</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptionActions.filter(a => a.action === 'reject').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Manual Actions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptionActions.filter(a => ['activate', 'extend', 'revoke'].includes(a.action)).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Actions</option>
                <option value="approve">Approvals</option>
                <option value="reject">Rejections</option>
                <option value="activate">Activations</option>
                <option value="extend">Extensions</option>
                <option value="revoke">Revocations</option>
              </select>
              <button
                onClick={() => setShowManualActionModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Manual Action
              </button>
            </div>
          </div>
        </div>

        {/* Actions Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action & Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActions.map((action) => (
                  <tr key={action.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getActionIcon(action.action)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getActionBadge(action.action)}
                          </div>
                          <div className="text-sm text-gray-500">by {action.adminName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">#{action.userId}</span>
                      </div>
                      {action.receiptId > 0 && (
                        <div className="text-xs text-gray-500">Receipt #{action.receiptId}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{action.details}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {action.previousStatus && action.newStatus && (
                        <div className="text-sm">
                          <span className="text-gray-500">{action.previousStatus}</span>
                          <span className="mx-2">→</span>
                          <span className="text-gray-900 font-medium">{action.newStatus}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div>{new Date(action.timestamp).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(action.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manual Action Modal */}
        {showManualActionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Manual Subscription Action</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select User *
                    </label>
                    <select
                      value={manualAction.userId}
                      onChange={(e) => {
                        const selectedUser = users.find(u => u.id === Number(e.target.value));
                        setManualAction(prev => ({
                          ...prev,
                          userId: e.target.value,
                          userName: selectedUser?.name || ''
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a user...</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action *
                    </label>
                    <select
                      value={manualAction.action}
                      onChange={(e) => setManualAction(prev => ({ ...prev, action: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="activate">Activate Subscription</option>
                      <option value="extend">Extend Subscription</option>
                      <option value="revoke">Revoke Subscription</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Details *
                    </label>
                    <textarea
                      value={manualAction.details}
                      onChange={(e) => setManualAction(prev => ({ ...prev, details: e.target.value }))}
                      rows={3}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Explain the reason for this manual action..."
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        This action will be logged and cannot be undone. Please ensure you have the proper authorization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowManualActionModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleManualAction}
                    disabled={!manualAction.userId || !manualAction.details.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Execute Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscriptionActions;