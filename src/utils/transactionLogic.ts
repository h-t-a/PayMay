import { Transaction } from '../types/transactions';

export function getTransactionView(
  tx: Transaction,
  currentUserId: string
) {
  const isCreator = tx.creator_id === currentUserId;

  if (isCreator) {
    return {
      direction: tx.type, // pay | receive
      counterpartyId: tx.friend_id,
    };
  }

  return {
    direction: tx.type === 'pay' ? 'receive' : 'pay',
    counterpartyId: tx.creator_id,
  };
}
