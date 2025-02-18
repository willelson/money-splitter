import { Skeleton } from "@/components/ui/skeleton";

function TransactionSkeleton() {
  const expenseSkeleton = (
    <div className="border-b px-1 py-2">
      <div className="flex justify-between py-1">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 rounded-xl" />
          <div>
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      {expenseSkeleton}
      {expenseSkeleton}
      {expenseSkeleton}
      {expenseSkeleton}
    </div>
  );
}

export default TransactionSkeleton;
