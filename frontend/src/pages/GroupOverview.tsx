import NavBar from "@/components/navbar/NavBar";
import { useCodeParam } from "@/hooks/useCodeParam";
import { useGroupStore } from "@/store/groupStore";
import { trpc } from "../trpc";

function GroupOverview() {
  const { selectedGroup } = useGroupStore();
  const { code } = useCodeParam();

  const {
    data: balances,
    isLoading,
    error,
  } = trpc.groups.getBalances.useQuery({ code: code! });

  if (balances === undefined) return <p>balances error</p>;

  if (error) console.error(error);

  // TODO: handle loadin state and errors
  if (selectedGroup === null && !isLoading) return <p>group error</p>;

  return (
    <div className="flex h-full flex-col gap-2">
      <div>
        <h1 className="text-lg">{selectedGroup!.name}</h1>
        <p className="text-md mt-4 font-extralight text-muted-foreground">
          BALANCE
        </p>
      </div>
      <div className="flex-1">
        <ul className="flex flex-col gap-4 rounded bg-muted p-2">
          {balances.map((user, index) => (
            <li
              className="flex justify-between py-1"
              key={`group-user-${index}`}
            >
              <p>{user.name}</p>
              <p>€ {user.balance.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <NavBar />
    </div>
  );
}

export default GroupOverview;
