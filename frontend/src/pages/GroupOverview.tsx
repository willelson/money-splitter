import NavBar from "@/components/navbar/NavBar";
import BalancesSkeletons from "@/components/skeletons/BalancesSkeletons";
import GroupOverviewSkeleton from "@/components/skeletons/GroupOverviewSkeleton";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore } from "@/store/groupStore";
import { trpc } from "@/trpc";

function GroupOverview() {
  const { selectedGroup } = useGroupStore();
  const { code } = useCodeParam();

  const {
    data: balances,
    isLoading,
    error,
  } = trpc.groups.getBalances.useQuery({ code: code! });

  if (error !== null || (selectedGroup === null && !isLoading))
    return <p className="text-light">There was an error loading this group.</p>;

  if (balances === undefined) return <GroupOverviewSkeleton />;

  const userBalances = (
    <ul className="flex flex-col gap-4 rounded bg-muted p-2">
      {balances !== undefined &&
        balances.map((user, index) => (
          <li className="flex justify-between py-1" key={`group-user-${index}`}>
            <p>{user.name}</p>
            <p>
              {user.balance.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </li>
        ))}
    </ul>
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <h1 className="text-lg">{selectedGroup!.name}</h1>
        <p className="text-md mt-4 font-extralight text-muted-foreground">
          BALANCE
        </p>
      </div>
      <div className="flex-1">
        {isLoading ? <BalancesSkeletons /> : userBalances}
      </div>
      <NavBar />
    </div>
  );
}

export default GroupOverview;
