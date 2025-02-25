import { Skeleton } from "@/components/ui/skeleton";

function GroupsSkeleton() {
  const groupSkeleton = (
    <div className="flex flex-col">
      <Skeleton className="mb-2 h-3 w-24" />
      <Skeleton className="h-2 w-16" />
    </div>
  );
  return (
    <>
      {groupSkeleton}
      {groupSkeleton}
    </>
  );
}

export default GroupsSkeleton;
