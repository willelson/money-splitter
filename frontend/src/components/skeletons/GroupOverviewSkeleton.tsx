import NavBar from "@/components/navbar/NavBar";
import { Skeleton } from "@/components/ui/skeleton";
import BalancesSkeletons from "./BalancesSkeletons";

function GroupOverviewSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <Skeleton className="mb-6 h-5 w-24" />
        <p className="text-md mt-4 font-extralight text-muted-foreground">
          BALANCE
        </p>
      </div>
      <div className="flex-1">{<BalancesSkeletons />}</div>
      <NavBar />
    </div>
  );
}

export default GroupOverviewSkeleton;
