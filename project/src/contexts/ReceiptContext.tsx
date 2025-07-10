import React, { createContext, useContext, useState } from 'react';

export interface PaymentReceipt {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  planType: 'pro' | 'premium';
  planPrice: number;
  receiptFile: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface SubscriptionAction {
  id: number;
  receiptId: number;
  userId: number;
  action: 'approve' | 'reject' | 'activate' | 'extend' | 'revoke';
  adminId: number;
  adminName: string;
  timestamp: string;
  details: string;
  previousStatus?: string;
  newStatus?: string;
}

interface ReceiptContextType {
  receipts: PaymentReceipt[];
  subscriptionActions: SubscriptionAction[];
  approveReceipt: (receiptId: number, adminName: string, notes?: string) => void;
  rejectReceipt: (receiptId: number, adminName: string, reason: string) => void;
  manualSubscriptionAction: (userId: number, action: string, adminName: string, details: string) => void;
  getReceiptById: (id: number) => PaymentReceipt | undefined;
  getActionsByReceiptId: (receiptId: number) => SubscriptionAction[];
  uploadReceipt: (receipt: Omit<PaymentReceipt, 'id' | 'uploadDate' | 'status'>) => void;
}

const ReceiptContext = createContext<ReceiptContextType | undefined>(undefined);

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error('useReceipt must be used within a ReceiptProvider');
  }
  return context;
};

// Mock data for receipts
const mockReceipts: PaymentReceipt[] = [
  {
    id: 1,
    userId: 2,
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    planType: 'pro',
    planPrice: 29,
    receiptFile: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    fileName: 'bank_transfer_receipt_001.jpg',
    fileSize: 245760,
    uploadDate: '2024-01-20T10:30:00Z',
    status: 'pending'
  },
  {
    id: 2,
    userId: 4,
    userName: 'Emily Davis',
    userEmail: 'emily@example.com',
    planType: 'premium',
    planPrice: 59,
    receiptFile: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    fileName: 'payment_confirmation.pdf',
    fileSize: 512000,
    uploadDate: '2024-01-19T14:15:00Z',
    status: 'approved',
    reviewedBy: 'Admin User',
    reviewedAt: '2024-01-19T16:20:00Z',
    notes: 'Payment verified successfully'
  },
  {
    id: 3,
    userId: 5,
    userName: 'David Brown',
    userEmail: 'david@example.com',
    planType: 'pro',
    planPrice: 29,
    receiptFile: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    fileName: 'receipt_scan.jpg',
    fileSize: 189440,
    uploadDate: '2024-01-18T09:45:00Z',
    status: 'rejected',
    reviewedBy: 'Admin User',
    reviewedAt: '2024-01-18T11:30:00Z',
    rejectionReason: 'Receipt amount does not match plan price'
  },
  {
    id: 4,
    userId: 6,
    userName: 'Lisa Park',
    userEmail: 'lisa@example.com',
    planType: 'premium',
    planPrice: 59,
    receiptFile: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    fileName: 'mobile_payment_screenshot.png',
    fileSize: 334560,
    uploadDate: '2024-01-21T16:20:00Z',
    status: 'pending'
  }
];

const mockActions: SubscriptionAction[] = [
  {
    id: 1,
    receiptId: 2,
    userId: 4,
    action: 'approve',
    adminId: 1,
    adminName: 'Admin User',
    timestamp: '2024-01-19T16:20:00Z',
    details: 'Receipt approved - Premium subscription activated for 1 month',
    previousStatus: 'none',
    newStatus: 'active'
  },
  {
    id: 2,
    receiptId: 3,
    userId: 5,
    action: 'reject',
    adminId: 1,
    adminName: 'Admin User',
    timestamp: '2024-01-18T11:30:00Z',
    details: 'Receipt rejected - Amount mismatch',
    previousStatus: 'none',
    newStatus: 'none'
  }
];

export const ReceiptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [receipts, setReceipts] = useState<PaymentReceipt[]>(mockReceipts);
  const [subscriptionActions, setSubscriptionActions] = useState<SubscriptionAction[]>(mockActions);

  const approveReceipt = (receiptId: number, adminName: string, notes?: string) => {
    setReceipts(prev => prev.map(receipt => 
      receipt.id === receiptId 
        ? { 
            ...receipt, 
            status: 'approved' as const,
            reviewedBy: adminName,
            reviewedAt: new Date().toISOString(),
            notes
          }
        : receipt
    ));

    const receipt = receipts.find(r => r.id === receiptId);
    if (receipt) {
      const newAction: SubscriptionAction = {
        id: Date.now(),
        receiptId,
        userId: receipt.userId,
        action: 'approve',
        adminId: 1,
        adminName,
        timestamp: new Date().toISOString(),
        details: `Receipt approved - ${receipt.planType} subscription activated for 1 month`,
        previousStatus: 'none',
        newStatus: 'active'
      };
      setSubscriptionActions(prev => [newAction, ...prev]);
    }
  };

  const rejectReceipt = (receiptId: number, adminName: string, reason: string) => {
    setReceipts(prev => prev.map(receipt => 
      receipt.id === receiptId 
        ? { 
            ...receipt, 
            status: 'rejected' as const,
            reviewedBy: adminName,
            reviewedAt: new Date().toISOString(),
            rejectionReason: reason
          }
        : receipt
    ));

    const receipt = receipts.find(r => r.id === receiptId);
    if (receipt) {
      const newAction: SubscriptionAction = {
        id: Date.now(),
        receiptId,
        userId: receipt.userId,
        action: 'reject',
        adminId: 1,
        adminName,
        timestamp: new Date().toISOString(),
        details: `Receipt rejected - ${reason}`,
        previousStatus: 'none',
        newStatus: 'none'
      };
      setSubscriptionActions(prev => [newAction, ...prev]);
    }
  };

  const manualSubscriptionAction = (userId: number, action: string, adminName: string, details: string) => {
    const newAction: SubscriptionAction = {
      id: Date.now(),
      receiptId: 0,
      userId,
      action: action as any,
      adminId: 1,
      adminName,
      timestamp: new Date().toISOString(),
      details,
      previousStatus: 'active',
      newStatus: action === 'revoke' ? 'expired' : 'active'
    };
    setSubscriptionActions(prev => [newAction, ...prev]);
  };

  const getReceiptById = (id: number): PaymentReceipt | undefined => {
    return receipts.find(receipt => receipt.id === id);
  };

  const getActionsByReceiptId = (receiptId: number): SubscriptionAction[] => {
    return subscriptionActions.filter(action => action.receiptId === receiptId);
  };

  const uploadReceipt = (receiptData: Omit<PaymentReceipt, 'id' | 'uploadDate' | 'status'>) => {
    const newReceipt: PaymentReceipt = {
      ...receiptData,
      id: Date.now(),
      uploadDate: new Date().toISOString(),
      status: 'pending'
    };
    setReceipts(prev => [newReceipt, ...prev]);
  };

  const value = {
    receipts,
    subscriptionActions,
    approveReceipt,
    rejectReceipt,
    manualSubscriptionAction,
    getReceiptById,
    getActionsByReceiptId,
    uploadReceipt
  };

  return <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>;
};