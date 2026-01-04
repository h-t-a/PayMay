import { getTransactionView } from '@/utils/transactionLogic';

export default function TransactionCard({ tx, userId }: any) {
  const view = getTransactionView(tx, userId);

  const color =
    view.direction === 'pay' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="border p-3 rounded flex justify-between">
      <div>
        <p className="font-semibold">{tx.description || 'Transaction'}</p>
        <p className={`text-sm ${color}`}>
          {view.direction.toUpperCase()}
        </p>
      </div>
      <p className="font-bold">{tx.amount} MMK</p>
    </div>
  );
}
