import { Skeleton } from "@/components/ui/skeleton";

function BalancesSkeletons() {
  return (
    <ul className="flex flex-col gap-4 rounded bg-muted p-2">
      <li className="flex justify-between py-1">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="mb-2 h-4 w-8" />
      </li>
      <li className="flex justify-between py-1">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="mb-2 h-4 w-8" />
      </li>
      <li className="flex justify-between py-1">
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="mb-2 h-4 w-8" />
      </li>
    </ul>
  );
}

export default BalancesSkeletons;
