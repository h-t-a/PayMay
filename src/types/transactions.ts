export type TransactionType = 'pay' | 'receive';

export interface Transaction {
  id: string;
  creator_id: string;
  friend_id: string;
  type: TransactionType;
  amount: number;
  created_at: string;
}
