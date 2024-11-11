export type PaymentMethod = 'stripe' | 'paystack' | 'flutterwave';

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  error?: string;
  transactionId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentProvider {
  id: PaymentMethod;
  name: string;
  description: string;
  supportedRegions: string[];
  supportedCurrencies: string[];
}